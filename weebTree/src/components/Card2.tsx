import type { User } from "../types/user"
import { FaPhoneAlt } from "react-icons/fa";
interface Card3Props {
  user: User
}

export default function Card2({ user }: Card3Props) {
  return (
    <div className="w-full max-w-md relative overflow-hidden group rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={user.picture.large || "/placeholder.svg?height=96&width=96"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4 border-white/50 shadow-lg group-hover:border-white transition-all duration-300"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-bold text-white group-hover:scale-105 transform transition-transform duration-300">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-blue-100 mt-1 capitalize">{user.gender}</p>
            <p className="text-white/90 mt-1 flex items-center"><FaPhoneAlt className="mr-2 text-gray-200" />  {user.phone}</p>
            <div className="mt-2 text-blue-100">
              <p className="group-hover:text-white transition-colors duration-200">
                {user.location.city}, {user.location.country}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
      </div>
    </div>
  )
}

//same for here, using skeleton will make the card look more professional