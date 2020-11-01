import { optionsJWT, EmailHandle } from "./../../../utils/index";
import { TargetType, Resolvers } from "./../../../types/index";
import { User, Verification } from "../../../entities/index";
import { EmailSignUpInput } from '../../../types/graph';
import {
     EmailSignUpMutationArgs,
     EmailSignUpResponse,
} from "./../../../types/graph.d";
const resolvers: Resolvers = {
     Mutation: {
          EmailSignUp: async (
               _,
               args: EmailSignUpMutationArgs
          ): Promise<EmailSignUpResponse> => {
               const { email, phoneNumber, firstName, age, lastName, profilePhoto, password } = args.data;
               //find the user ans scheck in found or not
               try {
                    const existingUser = await User.findOne({ email });
                    //cheack if user login the site
                    if (existingUser) {
                         return {
                              ok: false,
                              error: "You should log in instead",
                              token: null,
                         };
                    } else {
                         const phoneVerification = await Verification.findOne({
                              payload: phoneNumber,
                              verified: true,
                         });
                         if (phoneVerification) {
                              const addUser: EmailSignUpInput = {
                                   email, phoneNumber, firstName, age, lastName, profilePhoto, password
                              }
                              const newUser = await User.create(addUser).save();
                              if (newUser.email) {
                                   const emailVerification = await Verification.create({
                                        payload: newUser.email,
                                        target: TargetType.Email,
                                   }).save();
                                   await EmailHandle.sendVerificationEmail(
                                        newUser.fullName,
                                        emailVerification.key
                                   );
                              }
                              const token = optionsJWT.createJWT(String(newUser.id));
                              return {
                                   ok: true,
                                   error: null,
                                   token,
                              };
                         } else {
                              return {
                                   ok: false,
                                   error: "You haven't verified your phone number",
                                   token: null,
                              };
                         }
                    }
               } catch (error) {
                    return {
                         ok: false,
                         error: error.message,
                         token: null,
                    };
               }
          },
     },
};

export default resolvers;
