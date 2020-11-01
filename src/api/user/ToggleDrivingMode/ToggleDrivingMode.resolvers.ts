import { User } from "../../../entities/index";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/index";
import { privateResolver } from "../../../utils/index";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        if (!user) {
          return {
            ok: false,
            error: "you should be login",
          };
        }
        user.isDriving = !user.isDriving;
        user.save();
        return {
          ok: true,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
