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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-xl border border-gray-300">
      <div className="text-center mb-6">
        <blockquote className="italic text-xl text-gray-800">
          "The best way to predict the future is to create it."
        </blockquote>
        <cite className="block mt-2 text-gray-600">– Peter Drucker</cite>
      </div>
      <Table className="min-w-full">
        <TableCaption className="text-center text-lg font-semibold mb-4">
          Recent Posted Jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-500 text-white">
            <TableHead className="py-3 px-4 text-black font-bold">
              Company Name
            </TableHead>
            <TableHead className="py-3 px-4 text-black font-bold">
              Role
            </TableHead>
            <TableHead className="py-3 px-4 text-black font-bold">
              Date
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-black font-bold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-gray-100 transition-colors"
            >
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-600 hover:text-gray-800 transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {/* <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)} // Navigate to the edit page
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div> */}
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
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

export default AdminJobsTable;
