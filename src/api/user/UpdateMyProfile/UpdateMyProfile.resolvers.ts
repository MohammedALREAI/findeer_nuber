import { cleanNullArgs, privateResolver } from "./../../../utils/index";
import { User } from "../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/index";

// when we send this is async it will be return promise
//to ansure the user is login in in the application
const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        if (notNull.password) {
          user.password = notNull.password;
          user.save();
          delete notNull.password;
        }
        try {
          await User.update({ id: user.id }, { ...notNull });
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
      }
    ),
  },
};

export default resolvers;
