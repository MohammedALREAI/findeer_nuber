import { User } from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import {privateResolver} from "../../../utils/index";


// @ how it work
// find the user how login by  privateResolver wutch will return the user the serche the place that found for this user
const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponse> => {
           const id=req.user.id
        try {
          const user: User = await User.findOne(
            { id },
            { relations: ["places"] }
          );
          if ( user && user.places) {
               return {
              ok: true,
              places: user.places,
              error: null,}


          } else {
            return {
              ok: false,
              places: null,
              error: "User not found",
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null,
          };
        }
      }
    ),
  },
};
export default resolvers;
