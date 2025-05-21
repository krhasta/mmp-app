import { signOut } from "@/utils/supabase/actions";

export default function BtnSignout() {
  return (
    <form action={signOut}>
      <button className="border rounded px-2.5 py-2" type="submit">
        Sign Out
      </button>
    </form>)
}