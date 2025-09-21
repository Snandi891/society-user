export default function MemberList({ members }) {
  return (
    <ul className="space-y-2">
      {members.map((m) => (
        <li key={m._id} className="border p-2 rounded shadow">
          <strong>{m.name}</strong> - {m.flatNumber || "N/A"} -{" "}
          {m.phone || "N/A"}
        </li>
      ))}
    </ul>
  );
}
