export type TApiAllAvailabilitiesResp = {
  availabilities: {
    id: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    appointments: {
      id: string,
      createdAt: Date,
      startTime: Date,
      endTime: Date,
      status: 'accepted' | 'pending' | 'declined',
      firstName: string,
      lastName: string,
      phoneNum: string,
    }[]
  }[]
}

export type TApiSingleAvailabilityResp = {
  availability: {
    id: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    appointments: {
      id: string,
      createdAt: Date,
      startTime: Date,
      endTime: Date,
      status: 'accepted' | 'pending' | 'declined',
      firstName: string,
      lastName: string,
      phoneNum: string,
    }[]
  }
}

export type TApiAllAppointmentsResp = {
  appointments: {
    id: string,
    createdAt: Date,
    startTime: Date,
    endTime: Date,
    status: 'accepted' | 'pending' | 'declined',
    firstName: string,
    lastName: string,
    phoneNum: string,
  }[]
}

export type TApiSingleAppointmentResp = {
  appointment: {
    id: string,
    createdAt: Date,
    startTime: Date,
    endTime: Date,
    status: 'accepted' | 'pending' | 'declined',
    firstName: string,
    lastName: string,
    phoneNum: string,
  }
}

export type TApiSingleAvailabilityReq = {
  date: Date,
  startTime: Date,
  endTime: Date,
}

export type TApiSingleAppointmentReq = {
  startTime: Date,
  endTime: Date,
  status: 'accepted' | 'pending' | 'declined',
  firstName: string,
  lastName: string,
  phoneNum: string,
  availId: string,
}

export type TApiErrorResp = {
  msg: string;
};

export type TSingleAvailability = {
  id: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  appointments: {
    id: string,
    createdAt: Date,
    startTime: Date,
    endTime: Date,
    status: 'accepted' | 'pending' | 'declined',
    firstName: string,
    lastName: string,
    phoneNum: string,
    availId: string,
  }[]
}

export type TSingleAppointment = {
  id: string;
  createdAt: Date;
  startTime: Date;
  endTime: Date;
  status: 'accepted' | 'pending' | 'declined';
  firstName: string;
  lastName: string;
  phoneNum: string;
  availId: string;
}

export type TStatus = 'accepted' | 'pending' | 'declined';