import React from 'react';

const AnalyticsTable = () => {
  return (
    <table className="border-collapse">
      <tbody>
        <tr>
          <td className="p-4 border-none text-lg">Total sales</td>
          <td className="p-4 border-none font-bold text-xl">$2620</td>
        </tr>
        <tr>
          <td className="p-4 border-none text-lg">Total orders</td>
          <td className="p-4 border-none font-bold text-xl">$43</td>
        </tr>
        <tr>
          <td className="p-4 border-none text-lg">Average order amount</td>
          <td className="p-4 border-none font-bold text-xl">$189</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AnalyticsTable;
