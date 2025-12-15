import { cookies } from 'next/headers';

export async function getIsMobile(): Promise<boolean> {
  const cookieStore = await cookies();
  const deviceType = cookieStore.get('device-type')?.value;
  return deviceType === 'mobile';
}
