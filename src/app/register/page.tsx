'use client';
import Panel from '@/component/Panel';
import { useState } from 'react';

export default function Register() {
  const [selectedSource, setSelectedSource] = useState<string>();
  const [partNumber, setPartNumber] = useState<string>('');
  const [productInfo, setProductInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function getElementClassName(sourceId: string) {
    const baseSelectClass = 'w-[150px] h-[70px] p-[15px] bg-gray-700 rounded-2xl cursor-pointer';
    const selectedClass = 'ring-2 ring-blue-500 bg-gray-600';
    const hoverClasses = 'hover:bg-gray-600';

    return `${baseSelectClass} ${selectedSource === sourceId ? selectedClass : hoverClasses}`;
  }

  // API 호출 함수
  const handleSearch = async () => {
    if (!selectedSource) {
      setError('제품 소스를 선택해주세요');
      return;
    }

    if (!partNumber.trim()) {
      setError('제품 번호를 입력해주세요');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 내부 API 라우트 호출
      const response = await fetch(`/api/digikey?partNumber=${encodeURIComponent(partNumber)}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '제품 정보를 가져오는데 실패했습니다');
      }

      const data = await response.json();
      setProductInfo({
        source: 'digikey',
        name: partNumber,
        data: data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
      setProductInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-[1000px] text-[25px] font-bold">제품 등록</div>
      <div className="w-[1000px] h-[650px] shadow-lg flex items-center justify-between rounded-[30px] bg-[#303030] p-[12px]">
        <div className="h-[650px] py-[12px] flex-1">
          <div className="flex flex-col mr-[12px] items-center justify-between">
            <div className="flex items-center">
              <img
                className={getElementClassName('digikey')}
                onClick={() => setSelectedSource('digikey')}
                src="/imgs/logo-digikey.svg"
                alt="Digi-Key"
              />
              <img
                className={`${getElementClassName('mouser')} mx-[50px]`}
                onClick={() => setSelectedSource('mouser')}
                src="/imgs/logo-mouser.png"
                alt="Mouser"
              />
              <div
                className={`${getElementClassName('manual')} flex items-center justify-center text-center text-[25px]`}
                onClick={() => setSelectedSource('manual')}
              >
                수동 입력
              </div>
            </div>
          </div>
          <div className="flex items-center justify-evenly mt-[40px]">
            <input
              className="w-[500px] h-[40px] mt-1 bg-[#b4b4b4] rounded-[10px] px-3 text-black"
              type="text"
              placeholder="제품 번호를 입력해주세요!"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
            />
            <button
              className="w-[100px] h-[40px] bg-[#b4b4b4] rounded-[10px]"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? '로딩 중...' : '확인'}
            </button>
          </div>
        </div>
        <Panel>
          {isLoading && <p>데이터를 불러오는 중입니다...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading &&
            !error &&
            !productInfo &&
            !selectedSource &&
            '좌측에서 제품 소스를 선택하고 제품 번호를 입력해주세요!'}
          {!isLoading && !error && !productInfo && selectedSource && '제품 번호를 입력하고 확인 버튼을 눌러주세요!'}
          {!isLoading && !error && productInfo && (
            <div>
              <p>
                <strong>소스:</strong> {productInfo.source}
              </p>
              <p>
                <strong>제품 번호:</strong> {productInfo.name}
              </p>
              <p>
                <strong>데이터:</strong>
              </p>
              <pre className="whitespace-pre-wrap break-all bg-gray-800 p-2 rounded text-sm">
                {JSON.stringify(productInfo.data, null, 2)}
              </pre>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
