import { LuCircleHelp } from "react-icons/lu";
import { getReactIcon, resolveIconName } from "@/lib/reactIcon";

export default function ReactIcon({ name, className = "w-5 h-5", fallback: Fallback = LuCircleHelp }) {
 const Icon = getReactIcon(resolveIconName(name)) || Fallback;
 return <Icon className={className} aria-hidden="true" />;
}
