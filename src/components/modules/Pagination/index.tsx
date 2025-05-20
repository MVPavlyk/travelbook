'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import buildSearchParams from '@/lib/utils/buildSearchParams';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import getSearchParams from '@/lib/utils/getSearchParams';

type TPaginationProps = {
  total: number;
};

type TParamsObj = {
  page?: string;
};

const perPage = 12;

const Pagination: React.FC<TPaginationProps> = ({ total: totalItems }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (!totalItems || totalItems <= perPage) return null;

  const page = searchParams.get('page');

  const setPage = (val: string) => {
    router.push(
      pathname +
        buildSearchParams({
          ...getSearchParams(searchParams),
          page: String(val),
        })
    );
  };

  if (Number(page) * perPage - perPage + 1 > totalItems) {
    if (page !== '1') {
      setPage(String(Number(page) - 1));
    }
  }

  const total = Math.ceil(totalItems / perPage);

  useEffect(() => {
    if (!page) {
      const paramsObg: TParamsObj = {};

      if (!page) paramsObg.page = '1';

      router.push(
        pathname +
          buildSearchParams({ ...getSearchParams(searchParams), ...paramsObg })
      );
    }
  }, []);

  const buttons = Array.from(
    new Set(
      [
        1,
        page,
        Number(page || 1) + 1,
        Number(page || 1) + 2,
        Number(page || 1) - 1,
        Number(page || 1) - 2,
        total,
      ].map(Number)
    )
  )
    .sort((a, b) => Number(a) - Number(b))
    .filter((el) => !!el && Number(el) <= total && Number(el) >= 1)
    .map((el, idx, arr) =>
      arr[idx + 1] === Number(el) + 1 || el === total ? el : [el, '...']
    )
    .flat();

  return (
    <div className="mt-12 flex w-full justify-center">
      <div className="flex items-center gap-x-2">
        {buttons.map((el, index) =>
          el === '...' ? (
            <div
              key={`${el}-${index}`}
              className="w-9 text-center text-gray-700"
            >
              ...
            </div>
          ) : (
            <button
              key={el}
              onClick={() => setPage(String(el))}
              className={twMerge(
                classNames(
                  'flex h-8 w-9 cursor-pointer items-center justify-center rounded-[5px] text-xs bg-gray-700 text-white hover:bg-gray-800',
                  String(el) === page &&
                    'cursor-default bg-iris-100 text-white hover:bg-iris-100'
                )
              )}
            >
              {el}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
