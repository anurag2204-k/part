import type { User } from "../types/user"
import { FaPhoneAlt } from "react-icons/fa";
interface Card1Props {
  user: User
}

export default function Card1({ user }: Card1Props) {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex p-6">
        <div className="flex-shrink-0">
          <img
            src={user.picture.large}
            alt="Profile"
            className="h-24 w-24 rounded-md object-cover border-2 border-gray-200"
          />
        </div>
        <div className="ml-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className="text-sm text-gray-600 mt-1 capitalize">{user.gender}</p>
          <p className="text-sm text-gray-600 mt-1 flex items-center">
            <FaPhoneAlt className="mr-2" /> {user.phone}
          </p>
        </div>
      </div>
    </div>
  )
}

//we can also use some skeleton loading for the card which will reduce the flickering effect
