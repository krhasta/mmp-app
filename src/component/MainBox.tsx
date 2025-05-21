// { children }: Readonly<{ children: React.ReactNode }>
export default function MainBox({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[1000px] h-[750px] shadow-lg flex items-center justify-center rounded-[30px] bg-[#303030] py-[120px] px-[60px]">
        {children}
      </div>
    </div>
  );
}
