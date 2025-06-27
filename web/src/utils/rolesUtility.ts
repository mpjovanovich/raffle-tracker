import { Role, ROLE } from '@raffle-tracker/dto';

export const canAccess = (userRoles: Role[], acceptedRoles: Role[]) => {
  // Admins can do anything
  // Add the admin role to the accepted roles
  acceptedRoles.push(ROLE.ADMIN);

  // "some" is JavaScript's "any" operator
  return userRoles.some(role => acceptedRoles.includes(role));
};
