export const typeDefs = ["type GetChatResponse {\n  ok: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  GetMyPlaces: GetMyPlacesResponse!\n  GetNearbyRide: GetNearbyRideResponse!\n  GetRide(rideId: Int!): GetRideResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetNearbyDrivers: GetNearbyDriversResponse!\n  user: User\n}\n\ntype Subscription {\n  MessageSubscription: Message\n  RideStatusSubscription: Ride\n  DriversSubscription: User\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(text: String!, chatId: Int!): SendChatMessageResponse!\n  AddPlace(data: AddPlaceInput!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(data: EditPlaceInput!): EditPlaceResponse!\n  RequestRide(data: RequestRideInput!): RequestRideResponse!\n  UpdateRideStatus(rideId: Int!, status: StatusOptions!): UpdateRideStatusResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(data: EmailSignInInput!): EmailSignInResponse!\n  EmailSignUp(data: EmailSignUpInput!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  ReportMovement(orientation: Float, lastLat: Float, lastLng: Float): ReportMovementResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleDrivingMode: ToggleDrivingModeResponse!\n  UpdateMyProfile(firstName: String, lastName: String, email: String, password: String, profilePhoto: String, age: Int): UpdateMyProfileResponse!\n}\n\ntype Chat {\n  id: ID!\n  messages: [Message]\n  passengerId: Int!\n  passenger: User!\n  driverId: Int\n  driver: User!\n  rideId: Int\n  ride: Ride!\n  createdAt: String!\n  updatedAt: String!\n}\n\n# import '../../user/user'\ntype Message {\n  id: ID!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput AddPlaceInput {\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput EditPlaceInput {\n  placeId: Int!\n  name: String\n  isFav: Boolean\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Place {\n  id: ID!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype GetNearbyRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype GetRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ntype RequestRideResponse {\n  ok: Boolean!\n  error: String\n  ride: Ride\n}\n\ninput RequestRideInput {\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  distance: String!\n  duration: String!\n}\n\nenum StatusState {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTING\n  ONROUTE\n}\n\ntype Ride {\n  id: ID!\n  status: StatusState!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  distance: String!\n  duration: String!\n  driverId: Int\n  driver: User!\n  passengerId: Int!\n  passenger: User!\n  chat: Chat\n  chatId: Int\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype UpdateRideStatusResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum StatusOptions {\n  ACCEPTED\n  FINISHED\n  CANCELED\n  REQUESTING\n  ONROUTE\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ninput EmailSignInInput {\n  email: String!\n  password: String!\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ninput EmailSignUpInput {\n  firstName: String!\n  lastName: String!\n  email: String!\n  password: String!\n  profilePhoto: String!\n  age: Int!\n  phoneNumber: String!\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetNearbyDriversResponse {\n  ok: Boolean!\n  error: String\n  drivers: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: ID!\n  email: String! @unique\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  fbId: String\n  messages: [Message]\n  ridesAsPassenger: [Ride]\n  ridesAsDriver: [Ride]\n  chatsAsDriver: [Chat]\n  chatsAsPassenger: [Chat]\n  places: [Place]\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ToggleDrivingModeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum Target {\n  email\n  phone\n}\n\n# PAYLOAD LIKE MESSAGR FOR VERIVACATION LIKE 44545\ntype Verification {\n  id: ID!\n  target: Target!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  GetMyPlaces: GetMyPlacesResponse;
  GetNearbyRide: GetNearbyRideResponse;
  GetRide: GetRideResponse;
  GetMyProfile: GetMyProfileResponse;
  GetNearbyDrivers: GetNearbyDriversResponse;
  user: User | null;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface GetRideQueryArgs {
  rideId: number;
}

export interface GetChatResponse {
  ok: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: string;
  messages: Array<Message> | null;
  passengerId: number;
  passenger: User;
  driverId: number | null;
  driver: User;
  rideId: number | null;
  ride: Ride;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  text: string;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  messages: Array<Message> | null;
  ridesAsPassenger: Array<Ride> | null;
  ridesAsDriver: Array<Ride> | null;
  chatsAsDriver: Array<Chat> | null;
  chatsAsPassenger: Array<Chat> | null;
  places: Array<Place> | null;
  createdAt: string;
  updatedAt: string;
}

export interface Ride {
  id: string;
  status: StatusState;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
  driverId: number | null;
  driver: User;
  passengerId: number;
  passenger: User;
  chat: Chat | null;
  chatId: number | null;
  createdAt: string;
  updatedAt: string;
}

export type StatusState = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyPlacesResponse {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetNearbyRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetNearbyDriversResponse {
  ok: boolean;
  error: string | null;
  drivers: Array<User> | null;
}

export interface Mutation {
  SendChatMessage: SendChatMessageResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  RequestRide: RequestRideResponse;
  UpdateRideStatus: UpdateRideStatusResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  ReportMovement: ReportMovementResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleDrivingMode: ToggleDrivingModeResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface SendChatMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface AddPlaceMutationArgs {
  data: AddPlaceInput;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  data: EditPlaceInput;
}

export interface RequestRideMutationArgs {
  data: RequestRideInput;
}

export interface UpdateRideStatusMutationArgs {
  rideId: number;
  status: StatusOptions;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  data: EmailSignInInput;
}

export interface EmailSignUpMutationArgs {
  data: EmailSignUpInput;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface ReportMovementMutationArgs {
  orientation: number | null;
  lastLat: number | null;
  lastLng: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  profilePhoto: string | null;
  age: number | null;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface AddPlaceInput {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceInput {
  placeId: number;
  name: string | null;
  isFav: boolean | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestRideInput {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

export interface RequestRideResponse {
  ok: boolean;
  error: string | null;
  ride: Ride | null;
}

export type StatusOptions = "ACCEPTED" | "FINISHED" | "CANCELED" | "REQUESTING" | "ONROUTE";

export interface UpdateRideStatusResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInInput {
  email: string;
  password: string;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleDrivingModeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
  RideStatusSubscription: Ride | null;
  DriversSubscription: User | null;
}

export type Target = "email" | "phone";

export interface Verification {
  id: string;
  target: Target;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
