import { Place, User } from '../../../entities';
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import {privateResolver,cleanNullArgs} from "../../../utils/index";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        const {placeId}=args.data
        try {
          const place = await Place.findOne({ id: placeId });
          if (place) {
            if (place.userId === user.id) {
              const notNull = cleanNullArgs(args.data);
              await Place.update({ id: placeId }, { ...notNull });
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized to access this place ",
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found ",
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
