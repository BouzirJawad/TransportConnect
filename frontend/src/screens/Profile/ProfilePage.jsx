// src/screens/Profile/ProfilePage.jsx
import { useAuth } from "../../provider/AuthProvider";
import ProfileForm from "../../forms/ProfileForm";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <div className="text-center text-red-500 mt-10">User not found.</div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-300">
      <div className="max-w-3xl w-full mx-auto p-6 bg-gray-200 shadow rounded-lg">
        <h2 className="text-2xl font-bold text-blue-1 mb-4">My Profile</h2>
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
