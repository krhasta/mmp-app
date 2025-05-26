'use client';
import Panel from '@/component/Panel';
import { useState, ChangeEvent } from 'react';

export default function Register() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [productNumber, setProductNumber] = useState<string | null>(null);

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 검색 버튼 클릭 핸들러 (예시)
  const handleSearch = () => {
    if (productNumber && selectedMenu) {
      console.log(`Search for: ${productNumber} from ${selectedMenu}`);
      // 여기에 실제 API 호출 로직 추가
    } else if (productNumber) {
      console.log(`Search for: ${productNumber} (no vendor selected, or for manual entry connection)`);
      // 공급업체 없이 검색 또는 다른 로직
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-[1000px] text-[25px] font-bold text-white mb-3">
        {' '}
        {/* text-white, mb-3 추가 */}
        제품 등록
      </div>
      <div className="w-[1000px] h-[650px] shadow-lg flex items-start justify-between rounded-[30px] bg-[#303030] p-[12px]">
        {/* 왼쪽 패널 전체: 세로 Flex 컨테이너로 설정 */}
        <div className="w-full h-full flex flex-col text-white">
          {' '}
          {/* 1. flex flex-col 추가, text-white 기본 적용 */}
          {/* Digikey or Mouser 선택 */}
          <div className="relative w-full flex-shrink-0">
            {' '}
            {/* 2. flex-shrink-0 추가 */}
            <button
              className="w-full bg-[#444] text-white py-3 px-4 rounded-lg flex justify-between items-center focus:outline-none"
              onClick={toggleDropdown}
            >
              {selectedMenu || '메뉴 선택'}
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-[#444] rounded-lg shadow-lg">
                {['Digikey', 'Mouser'].map((menu) => (
                  <div
                    key={menu}
                    onClick={() => handleMenuSelect(menu)}
                    className="px-4 py-3 text-white hover:bg-[#666] cursor-pointer rounded-lg"
                  >
                    {menu}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* 제품 번호 입력 섹션 - 항상 표시 */}
          <div className="mt-[36px] flex-shrink-0">
            {' '}
            {/* 2. flex-shrink-0 추가 */}
            {/* 레이블 텍스트는 selectedMenu에 따라 변경 */}
            {selectedMenu && ['Digikey', 'Mouser'].includes(selectedMenu)
              ? `${selectedMenu} 제품 번호 입력`
              : '제품 번호 입력'}
            <div className="w-full flex justify-between items-center mt-2">
              {' '}
              {/* mt-2 추가 */}
              <div className="flex-1 bg-[#444] text-white py-3 px-4 rounded-lg flex items-center focus-within:ring-2 focus-within:ring-blue-500 mr-2">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                  placeholder={
                    selectedMenu && ['Digikey', 'Mouser'].includes(selectedMenu)
                      ? `${selectedMenu} 제품 번호를 입력하세요.`
                      : '검색하실 제품명을 입력하세요.' // 메뉴 미선택 시 플레이스홀더
                  }
                  value={productNumber || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setProductNumber(e.target.value)}
                />
              </div>
              <button
                className="w-auto px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex justify-center items-center text-center focus:outline-none transition-all duration-150 ease-in-out active:scale-98 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSearch}
                disabled={!productNumber || !selectedMenu} // 선택된 메뉴와 제품번호가 모두 있어야 활성화
              >
                검색
              </button>
            </div>
          </div>
          {/* 제품 수동 등록 섹션 */}
          <div className="mt-[36px] flex flex-col flex-1 min-h-0">
            {' '}
            {/* 3. flex-1, min-h-0, 일관된 mt-[36px] */}
            제품 수동 등록
            <div className="w-full flex-1 mt-2 bg-[#444] text-white py-3 px-4 rounded-lg flex flex-col focus:outline-none ">
              {' '}
              {/* 4. 내부 div가 남은 공간 채우도록 flex-1, mt-2 */}
              <textarea
                className="w-full h-full flex-1 bg-transparent text-white outline-none resize-none placeholder-gray-500 p-1"
                placeholder="제품 정보를 수동으로 입력하세요..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* 우측 제품 정보 확인 섹션 */}
        <div className="h-full ml-[12px]">
          <Panel />
        </div>
      </div>
    </div>
  );
}
