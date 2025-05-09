"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from './userSchema';
import type { User } from '@/domain/models/users.model';
import * as Yup from 'yup';

type UserFormSchema = Yup.InferType<typeof userSchema>;


function splitName(fullName: string): { firstName: string; lastName: string } {
  const [firstName, ...rest] = fullName.trim().split(" ");
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export default function UserInfoCard({ 
  user, 
}: {
  user: User;
}) {
  const { firstName, lastName } = splitName(user.name);
  const { isOpen, openModal, closeModal } = useModal();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs
      },
      address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode
      }
    },
  });

  const onSubmit = (data: UserFormSchema) => {
    console.log(data);
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.phone}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Website
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.website}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Company
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.company .name}
              </p>
            </div>
          </div>
        </div>

        <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Address
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Street
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.address.street}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Suite
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.address.suite}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  City/State
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.address.city}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Zipcode
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.address.zipcode}
                </p>
              </div>
            </div>
          </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <div className="px-2 pr-14">
                  <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                      Edit Personal Information
                  </h4>
                  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                      Update user details to keep profile up-to-date.
                  </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">

                  <hr className="my-4 border-gray-200 dark:border-white/[0.1]" />

                  <div className="mt-7">
                      <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                          Personal Information
                      </h5>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                          <div className="col-span-2 lg:col-span-1">
                              <Label>Full Name</Label>
                              <input type="text" {...register('name')} placeholder="Name" />
                              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                          </div>

                          <div className="col-span-2 lg:col-span-1">
                              <Label>Email Address</Label>
                              <input {...register('email')} placeholder="Email" />
                              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                          </div>

                          <div className="col-span-2 lg:col-span-1">
                              <Label>Phone</Label>
                              <input {...register('phone')} placeholder="Phone" />
                              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                          </div>

                          <div className="col-span-2 lg:col-span-1">
                              <Label>Website</Label>
                              <input {...register('website')} placeholder="Website" />
                              {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>}
                          </div>

                      </div>
                  </div>

                  <hr className="my-4 border-gray-200 dark:border-white/[0.1]" />

                  <div className="mt-7">
                      <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Company
                      </h5>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                          <div className="col-span-2 lg:col-span-1">
                              <Label>Company Name</Label>
                              <input {...register('company.name')} placeholder="Company" />
                              {errors.company?.name && <p className="mt-1 text-sm text-red-500">{errors.company.name.message}</p>}
                          </div>

                          <div className="col-span-2 lg:col-span-1">
                              <Label>Company Catch Phrase</Label>
                              <input {...register('company.catchPhrase')} placeholder="Company" />
                              {errors.company?.catchPhrase && <p className="mt-1 text-sm text-red-500">{errors.company.catchPhrase.message}</p>}
                          </div>

                          <div className="col-span-2 lg:col-span-1">
                              <Label>Company BS</Label>
                              <input {...register('company.bs')} placeholder="Company" />
                              {errors.company?.bs && <p className="mt-1 text-sm text-red-500">{errors.company.bs.message}</p>}
                          </div>
                      </div>
                  </div>
                </div>

                <hr className="my-4 border-gray-200 dark:border-white/[0.1]" />

                <div className="mt-7">
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                        Address
                    </h5>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div className="col-span-2 lg:col-span-1">
                            <Label>Street</Label>
                            <input {...register('address.street')} placeholder="Street" />
                            {errors.address?.street && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label>Suite</Label>
                            <input {...register('address.suite')} placeholder="Suite" />
                            {errors.address?.suite && <p className="mt-1 text-sm text-red-500">{errors.address.suite.message}</p>}
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label>City</Label>
                            <input {...register('address.city')} placeholder="City" />
                            {errors.address?.city && <p className="mt-1 text-sm text-red-500">{errors.address.city.message}</p>}
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label>Zipcode</Label>
                            <input type="number" {...register('address.zipcode')} placeholder="Zipcode" />
                            {errors.address?.zipcode && <p className="mt-1 text-sm text-red-500">{errors.address.zipcode.message}</p>}
                        </div>

                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={closeModal}>
                        Close
                    </Button>
                    <Button size="sm">
                        Save Changes
                    </Button>
                </div>
              </form>
          </div>
      </Modal>
    </div>
  );
}
