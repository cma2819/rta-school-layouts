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
  'est:start': unknown;
  'est:pause': unknown;
  'est:resume': unknown;
  'est:finish': unknown;
  'est:reset': unknown;
  'est:plus': unknown;
  'est:minus': unknown;
  'est:over': unknown;
};
