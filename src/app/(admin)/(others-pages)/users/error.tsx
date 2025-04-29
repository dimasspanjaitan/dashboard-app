// app/users/error.tsx
'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-500">
      Error loading user data: {error.message}
    </div>
  );
}