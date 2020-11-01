import {Ride,User,Chat} from "../../../entities/index";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import {privateResolver} from "../../../utils/index";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        const {status,rideId}=args;
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            if (status === "ACCEPTED") {
              ride = await Ride.findOne(
                {
                  id: rideId,
                  status:"REQUESTING"

                },
                { relations: ["passenger"] }
              );
              if (ride) {
                ride.driver = user;
                user.isTaken = true;
                user.save();
                const chat = await Chat.create({
                  driver: user,
                  passenger: ride.passenger
                }).save();
                ride.chat = chat;
                ride.save();
              }
            } else {
              ride = await Ride.findOne({
                id: rideId,
                driver: user
              });
            }
            if (ride) {
              ride.status = status;
              ride.save();
              pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Cant update ride"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driving"
          };
        }
      }
    )
  }
};
export default resolvers;
