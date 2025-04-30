export type MessageMap = {
  'programs:getColumns': {
    data: {
      url: string;
    };
    result: {
      columns: string[];
    };
  };
  'programs:loadSchedule': {
    data: {
      url: string;
      columns: {
        title: number;
      };
    };
  };
};
