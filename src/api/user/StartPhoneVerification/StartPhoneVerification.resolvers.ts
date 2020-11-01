import { sendVerificationSMS } from "./../../../utils/index";
import { Verification } from "../../../entities/index";
import { TargetType, Resolvers } from "./../../../types/index";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      try {
        //  show if there is  Verification code found pefore
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        });
        //    we need to remove the old Verification code
        if (existingVerification) {
          existingVerification.remove();
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: TargetType.Phone,
        }).save();
        //    key id four number to the user
        await sendVerificationSMS(newVerification.payload, newVerification.key);
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
    },
  },
};

export default resolvers;
