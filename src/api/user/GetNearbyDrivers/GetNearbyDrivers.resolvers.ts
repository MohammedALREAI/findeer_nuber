import { User } from "../../../entities/index";
import { Between, getRepository } from "typeorm";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/index";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
          const drivers: User[] = await getRepository(User).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05),
          });
          if (!drivers) {
            return {
              ok: true,
              error: null,
              drivers: null,
            };
          }

          return {
            ok: true,
            error: null,
            drivers,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null,
          };
        }
      }
    ),
  },
};
export default resolvers;
