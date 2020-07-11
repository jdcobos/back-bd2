export const SERVER_PORT: number = Number( process.env.port || 5000);
export const CONNECT_ORACLE = {
  user          : "SYSTEM",
  password      : "ROOT",
  connectString : " (DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.0.16)(PORT = 1525))(CONNECT_DATA =(SID= BBDDORL)))"
};
