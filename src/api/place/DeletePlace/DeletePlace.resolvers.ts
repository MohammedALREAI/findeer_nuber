import { Place, User } from "../../../entities/index";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import {privateResolver} from "../../../utils/privateResolver";



/// how will be work
// find the place if found 2 have authariad to access this place then remove
const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { req }
      ): Promise<DeletePlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
               // is autheried to acces the place
            if (place.userId === user.id) {
              place.remove();
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized",
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found",
            };
          }
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
