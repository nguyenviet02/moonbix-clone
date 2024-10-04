import React from 'react';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

const Loading = ({ isLoading, children }: Props) => {
  if (!isLoading) {
    return <>{children}</>;
  }
  return (
    <div className="size-full flex justify-center items-center gap-1">
      <div className="loading-line animation-delay-[50ms]"></div>
      <div className="loading-line animation-delay-100"></div>
      <div className="loading-line animation-delay-150"></div>
      <div className="loading-line animation-delay-200"></div>
    </div>
  );
};

export default Loading;
