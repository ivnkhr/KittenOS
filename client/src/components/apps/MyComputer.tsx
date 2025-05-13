import React from 'react';

// Vintage computer images are displayed as styled components rather than images

const MyComputer: React.FC = () => {
  return (
    <div className="p-4 bg-white border-[2px] border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] overflow-y-auto font-['MS_Sans_Serif',sans-serif] text-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hard Drive */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-2 bg-[#D4D0C8] flex items-center">
          <div className="w-20 h-16 bg-[#000080] mr-3 flex items-center justify-center text-white relative">
            <div className="w-12 h-10 bg-black border border-white absolute"></div>
            <div className="w-10 h-6 bg-[#008080] border border-white absolute mt-1 text-[8px] text-center">
              C:\
            </div>
          </div>
          <div>
            <div className="font-bold">(C:) Hard Drive</div>
            <div className="text-[10px] text-gray-700">512 MB Free</div>
          </div>
        </div>
        
        {/* Floppy Disk */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-2 bg-[#D4D0C8] flex items-center">
          <div className="w-20 h-16 bg-[#C0C0C0] mr-3 flex items-center justify-center relative border border-[#808080]">
            <div className="w-14 h-12 bg-[#000000] border border-white absolute"></div>
            <div className="w-10 h-2 bg-[#C0C0C0] border border-[#808080] absolute -bottom-1"></div>
          </div>
          <div>
            <div className="font-bold">(A:) Floppy Drive</div>
            <div className="text-[10px] text-gray-700">1.44 MB</div>
          </div>
        </div>
        
        {/* CD-ROM Drive */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-2 bg-[#D4D0C8] flex items-center">
          <div className="w-20 h-16 bg-[#C0C0C0] mr-3 flex items-center justify-center relative border border-[#808080]">
            <div className="w-16 h-2 bg-[#000000] border border-white absolute top-6"></div>
            <div className="w-3 h-3 bg-[#C0C0C0] rounded-full border border-[#808080] absolute bottom-2 right-2"></div>
          </div>
          <div>
            <div className="font-bold">(D:) CD-ROM Drive</div>
            <div className="text-[10px] text-gray-700">650 MB</div>
          </div>
        </div>
        
        {/* Network */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-2 bg-[#D4D0C8] flex items-center">
          <div className="w-20 h-16 bg-[#C0C0C0] mr-3 flex items-center justify-center relative border border-[#808080]">
            <div className="w-5 h-8 bg-[#000000] border border-white absolute top-2 left-3"></div>
            <div className="w-5 h-8 bg-[#000000] border border-white absolute top-2 right-3"></div>
            <div className="w-12 h-1 bg-[#008080] absolute bottom-3"></div>
          </div>
          <div>
            <div className="font-bold">Network</div>
            <div className="text-[10px] text-gray-700">Connected</div>
          </div>
        </div>
        
        {/* System Information */}
        <div className="border-[2px] border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-2 bg-[#D4D0C8] col-span-1 md:col-span-2">
          <div className="font-bold mb-1">System Information</div>
          <div className="text-[10px]">
            <p>Operating System: Windows 95</p>
            <p>Processor: Intel Pentium 100 MHz</p>
            <p>Memory: 16 MB RAM</p>
            <p>Graphics: VGA 640x480</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComputer;
