import { Verification, User } from "../../../entities/index";
import { RequestEmailVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver, EmailHandle } from "../../../utils/index";
import { TargetType } from "../../../types/type.d";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;
        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email,
            });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: user.email,
              target: TargetType.Email,
            }).save();
            await EmailHandle.sendVerificationEmail(
              user.fullName,
              newVerification.key
            );
            return {
              ok: true,
              error: null,
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        } else {
          return {
            ok: false,
            error: "Your user has no email to verify",
          };
        }
      }
    ),
  },
};

export default resolvers;
