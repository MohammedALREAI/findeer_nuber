import { privateResolver } from '../../../utils/index';
import { Place, User } from "../../../entities/index";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";




// // @addplace


// // args
// name: String!
// 	lat: Float!
// 	lng: Float!
// 	address: String!
// 	isFav: Boolean!
const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (
        _,
        args: AddPlaceMutationArgs,
        { req }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        try {
          await Place.create({ ...args.data, user }).save();
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
