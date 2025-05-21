import { ReactNode } from 'react';

interface PanelProps {
  children?: ReactNode;
}

export default function Panel({ children }: PanelProps) {
  return <div className="w-[300px] h-full bg-[#000000] rounded-[20px]">{children}</div>;
}
