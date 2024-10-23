import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="min-h-screen w-full bg-gray-200 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-xl border border-gray-300 flex flex-col items-center">
      <div className="text-center mb-6">
        <blockquote className="italic text-xl text-gray-800">
          "Success usually comes to those who are too busy to be looking for it."
        </blockquote>
        <cite className="block mt-2 text-gray-600">– Henry David Thoreau</cite>
      </div>
      <Table className="min-w-full">
        <TableCaption className="text-center text-lg font-semibold mb-4">
          Recent Registered Companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-600 text-white">
            <TableHead className="py-3 px-4 text-black font-bold">Logo</TableHead>
            <TableHead className="py-3 px-4 text-black font-bold">Name</TableHead>
            <TableHead className="py-3 px-4 text-black font-bold">Date</TableHead>
            <TableHead className="text-right py-3 px-4 text-black font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-100 transition-colors"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-600 hover:text-gray-800 transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 text-gray-600" />
                      <span className="text-gray-700">Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
