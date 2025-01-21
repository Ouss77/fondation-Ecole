import React from 'react';

function ParticipentTable({ participants }) {
  return (
    <div className="overflow-x-auto  "> 
      <table className="table-auto  border-collapse border border-gray-300">
        <thead className="bg-gray-100 lg:text-xl ">
          <tr>
            <th className="border border-gray-300 px-2 py-2 text-left sm:px-6 sm:py-3 w-1/3">Prénom NOM</th>
            <th className="border border-gray-300 px-2 py-2 text-left sm:px-6 sm:py-3 w-1/3">Institution</th>
            <th className="border border-gray-300 px-2 py-2 text-left sm:px-6 sm:py-3 w-1/6">Role</th>
          </tr>
        </thead>
        <tbody className="text-base ">
          {participants.map((participant, index) => (
            <tr
              key={index}
              className={`transition-all duration-300 ease-in-out ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 hover:scale-105`}
            >
              <td className="border border-gray-300 px-2 py-2 sm:px-10 sm:py-3">{participant.firstName}</td>
              <td className="border border-gray-300 px-2 py-2 sm:px-10 sm:py-3">{participant.institution}</td>
              <td className="border border-gray-300 px-4 py-2 sm:px-10 sm:py-3">{participant.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipentTable;
