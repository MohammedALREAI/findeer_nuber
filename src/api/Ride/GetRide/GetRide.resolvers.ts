import {User,Ride} from "../../../entities/index";
import { GetRideQueryArgs, GetRideResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import {privateResolver} from "../../../utils/index";


const resolvers: Resolvers = {
  Query: {
    GetRide: privateResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;
        const {rideId}=args

        try {
          const ride:Ride|undefined = await Ride.findOne({id:rideId});
          if (ride) {
            if (ride.passengerId === user.id || ride.driverId === user.id) {

               const newRide:Ride=ride as Ride;
              return {
                ok: true,
                error: null,
                ride: newRide
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized to access this",
                ride: null
              };
            }
          } else {

            return {
              ok: false,
              error: "Ride not found",
              ride: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
