
export interface Activity {
  id: string;
  title: string;
  tasks: string[];
  beforeImages: string[];
  afterImages: string[];
}

export interface CorrectiveDetails {
  component: string;
  cause: string;
  solution: string;
  beforeImages: string[];
  afterImages: string[];
}

export interface ReportData {
  company: string;
  date: string;
  location: string;
  technicians: string;
  team: string;
  tague: string;
  om: string;
  startTime: string;
  endTime: string;
  activities: Activity[];
  hasCorrective: boolean;
  correctiveDetails: CorrectiveDetails;
}
