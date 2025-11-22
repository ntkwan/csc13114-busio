// "use client";
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { ChevronDown, User, LogOut, History, CreditCard } from 'lucide-react';
// import { useAppSelector } from '@/shared/hooks';
// import { selectUser } from '@/auth/slices/authSlice';
// import useSocialSignOut from "../../../auth/hooks/useSocialSignOut";

// const UserMenu: React.FC = () => {
//   const router = useRouter();
//   const user = useAppSelector(selectUser);
//   const [isOpen, setIsOpen] = useState(false);
//   const { socialSignOut } = useSocialSignOut();

//   if (!user) return null;

//   const handleLogout = async () => {
//     try {
//       await socialSignOut();
//       setIsOpen(false);
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 100);
//     } catch (error) {
//       console.error('Logout error:', error);
//       setIsOpen(false);
//       window.location.href = '/';
//     }
//   };

//   const handleMenuClick = (tab: string) => {
//     setIsOpen(false);
//     router.push(`/settings?tab=${tab}`);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
//       >
//         {user.avatar ? (
//           <Image
//             src={user.avatar}
//             alt={user.name}
//             width={35}
//             height={35}
//             className="rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-8 h-8 bg-primary01 rounded-full flex items-center justify-center">
//             <User className="w-4 h-4 text-white" />
//           </div>
//         )}
//         <ChevronDown
//           className={`w-4 h-4 text-text transition-transform ${isOpen ? 'rotate-180' : ''}`}
//         />
//       </button>

//       {isOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-10"
//             onClick={() => setIsOpen(false)}
//           />

//           <div className="absolute right-0 mt-4 w-55 bg-white rounded-lg shadow-lg border border-gray-200 z-20">

//             <button
//               onClick={() => handleMenuClick('account')}
//               className="flex items-center space-x-4 w-full px-4 py-3 text-sm text-text hover:bg-gray-100 transition-colors border-b border-gray-100"
//             >
//               <User className="w-5 h-5 text-text" />
//               <span className="text-sm">Thông tin tài khoản</span>
//             </button>

//             <button
//               onClick={() => handleMenuClick('history')}
//               className="flex items-center space-x-4 w-full px-4 py-3 text-sm text-text hover:bg-gray-100 transition-colors border-b border-gray-100"
//             >
//               <History className="w-5 h-5 text-text" />
//               <span className="text-sm">Lịch sử đặt vé</span>
//             </button>

//             <button
//               onClick={() => handleMenuClick('cards')}
//               className="flex items-center space-x-4 w-full px-4 py-3 text-sm text-text hover:bg-gray-100 transition-colors border-b border-gray-100"
//             >
//               <CreditCard className="w-5 h-5 text-text" />
//               <span className="text-sm">Quản lý thẻ</span>
//             </button>

//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-4 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-50 transition-colors"
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="text-sm">Đăng xuất</span>
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserMenu;
