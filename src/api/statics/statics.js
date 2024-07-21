import * as message from "../message/message.js";
const prev_messages = {};
export const getStaticsMsg = async () => {
  const channel_detail = await channel
    .getChannelDetail()
    .then((r) => r.content);

  const channel_data = {
    liveTitle: channel_detail.liveTitle,
    channelId: channel_detail.channel.channelId,
    currentUserCount: channel_detail.concurrentUserCount,
  };
  const messages_data = message_buffer.map((m) => {
    return {
      nick: m.nick,
      uid: m.uid,
      msg: m.msg,
      osType: m.osType,
      utime: m.utime,
    };
  });

  const content = { header: channel_data, body: messages_data };
  // 총 시청자 수 증감, 채팅 개수 증감
  let diffUserCount = 0;
  let diffMsgCount = 0;
  if (prev_messages) {
    diffUserCount =
      content.header.currentUserCount - prev_messages.header.currentUserCount;
    diffMsgCount = content.body.length - prev_messages.body.length;
  }

  console.log(content);
  prev_messages = content;

  return {
    diffUserCount,
    diffMsgCount,
  };
};
