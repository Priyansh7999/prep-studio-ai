import { LayoutDashboard, Shield, UserCircle } from "lucide-react";

export const MenuList = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard
    },
    {
        name: 'Upgrade',
        path: '/dashboard/upgrade',
        icon: Shield
    },
    {
        name: 'Profile',
        path: '/dashboard/profile',
        icon: UserCircle
    }
]

export const Options = [
    {
      name: "Exam",
      icon: "/exam.png",
    },
    {
      name: "Job Interview",
      icon: "/job.png",
    },
    {
      name: "Practice",
      icon: "/practice.png",
    },
    {
      name: "Coding Prep",
      icon: "/code.png",
    },
    {
      name: "Other",
      icon: "/knowledge.png",
    },

]