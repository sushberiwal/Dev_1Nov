const connection = require("../model/db");
const { getUserByIdPromisified } = require("./userController");

function addInFollowingTablePromisified(uid, follow_id, isPublic) {
  return new Promise(function (resolve, reject) {
    let sql;
    if (isPublic) {
      sql = `INSERT INTO following_table(uid , followId) VALUES('${uid}' , '${follow_id}')`;
    } else {
      sql = `INSERT INTO following_table(uid , followId , isAccepted ) VALUES('${uid}' , '${follow_id}' , false )`;
    }
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function addInFollowerTablePromisified(follower_id, uid) {
  return new Promise(function (resolve, reject) {
    let sql = `INSERT INTO follower_table(uid , followerId) VALUES('${uid}' , '${follower_id}')`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function acceptRequestPromisified(followId, uid) {
  return new Promise(function (resolve, reject) {
    let sql = `UPDATE following_table SET isAccepted = 1 WHERE uid = '${uid}' AND followId = '${followId}'`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function getRequestsPromisfied(followId) {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT * FROM following_table WHERE followId = '${followId}' AND isAccepted = false`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function cancelRequestPromisified(followId, uid) {
  return new Promise(function (resolve, reject) {
    let sql = `DELETE FROM following_table WHERE uid = '${uid}' AND followId = '${followId}'`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function getAllFollowersIdsPromisifed(uid) {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT followerId FROM follower_table WHERE uid = '${uid}'`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
function getAllFollowingIdsPromisifed(uid) {
  return new Promise(function (resolve, reject) {
    let sql = `SELECT followId FROM following_table WHERE uid = '${uid}' AND isAccepted = true`;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function deleteFromFollowingTable(uid, followId) {
  return new Promise(function (resolve, reject) {
      let sql = `DELETE FROM following_table WHERE uid = '${uid}' AND followId = '${followId}'`;
      connection.query(sql , function(error , data){
          if(error){
              reject(error);
          }
          else{
              resolve(data);
          }
      })
  });
}
function deleteFromFollowerTable(followerId, uid) {
  return new Promise(function (resolve, reject) {
    let sql = `DELETE FROM follower_table WHERE uid = '${uid}' AND followerId = '${followerId}'`;
    connection.query(sql , function(error , data){
        if(error){
            reject(error);
        }
        else{
            resolve(data);
        }
    })
  });
}

async function sendRequest(req, res) {
  try {
    let { uid, follow_id } = req.body;
    let user = await getUserByIdPromisified(follow_id);
    console.log(user);
    let isPublic = user[0].isPublic;
    if (isPublic) {
      console.log("inside is Public true");
      //add in following table with isAccepted = true
      let followData = await addInFollowingTablePromisified(
        uid,
        follow_id,
        true
      );
      let followerData = await addInFollowerTablePromisified(uid, follow_id);
      res.json({
        message: "Request sent and accepted !!",
        followData,
        followerData,
      });
    } else {
      console.log("inside isPublic false");
      //add in following table with isAccepted = false
      let data = await addInFollowingTablePromisified(uid, follow_id);
      console.log(data);
      res.json({
        message: "Request Sent and is Pending !!",
        data,
      });
    }
  } catch (error) {
    res.json({
      message: "failed to send request !!",
      error,
    });
  }
}
async function acceptRequest(req, res) {
  try {
    let { uid, toBeAcceptedId } = req.body;
    let acceptData = await acceptRequestPromisified(uid, toBeAcceptedId);
    let followerData = await addInFollowerTablePromisified(toBeAcceptedId, uid);
    res.json({
      message: "Accepted Request !",
      acceptData,
      followerData,
    });
  } catch (error) {
    res.json({
      message: "Failed to accept request !",
      error,
    });
  }
}
async function getPendingRequests(req, res) {
  try {
    let uid = req.params.uid;
    let requests = await getRequestsPromisfied(uid);
    // console.log(requests);
    let requestsNames = [];
    for (let i = 0; i < requests.length; i++) {
      let user = await getUserByIdPromisified(requests[i].uid);
      requestsNames.push(user[0]);
    }
    console.log(requestsNames);
    res.json({
      message: "Got All Requests !",
      requestsNames,
    });
  } catch (error) {
    res.json({
      message: "Failed to get requests !!",
      error,
    });
  }
}
async function cancelRequest(req, res) {
  try {
    let { uid, toBeCancelId } = req.body;
    let cancelObj = await cancelRequestPromisified(uid, toBeCancelId);
    res.json({
      message: "Cancelled Request !",
      cancelObj,
    });
  } catch (error) {
    res.json({
      message: "Failed to cancel Request",
      error,
    });
  }
}
async function getAllFollowers(req, res) {
  try {
    let uid = req.params.uid;
    let followersIds = await getAllFollowersIdsPromisifed(uid);
    let followers = [];
    for (let i = 0; i < followersIds.length; i++) {
      let followerId = followersIds[i].followerId;
      let user = await getUserByIdPromisified(followerId);
      followers.push(user[0]);
    }
    res.json({
      message: "got all followers !",
      followers,
    });
  } catch (error) {
    res.json({
      message: "failed to get all followers !!",
    });
  }
}
async function getAllFollowing(req, res) {
  try {
    let uid = req.params.uid;
    let followingIds = await getAllFollowingIdsPromisifed(uid);
    // console.log(followingIds);
    let following = [];
    for (let i = 0; i < followingIds.length; i++) {
      let followId = followingIds[i].followId;
      let user = await getUserByIdPromisified(followId);
      following.push(user[0]);
    }
    res.json({
      message: "got all following !",
      following,
    });
  } catch (error) {
    res.json({
      message: "failed to get all following !!",
    });
  }
}
async function unfollow(req, res) {
  try {
    let { uid, unfollowId } = req.body;
    let followingObj = await deleteFromFollowingTable(uid, unfollowId);
    let followerObj = await deleteFromFollowerTable(uid, unfollowId);
    res.json({
        message:"Unfollowed succesfully !",
        followingObj,
        followerObj
    })
  } catch (error) {
    res.json({
      message: "Failed to unfollow !",
      error,
    });
  }
}

async function getSuggestions(req, res) {
  try{
      let {uid} = req.params;
      // console.log(uid);
      let followingIdsArray = await getAllFollowingIdsPromisifed(uid);
      // console.log(followingIdsArray); // [ {} , {} , {} , {} , {} ]

      let followingIds = followingIdsArray.map( obj =>{
        return obj.followId;
      });
      // console.log(followingIds);
      // followingIds = [  '12132' , '124124' , '124124' ];
      let suggestionIds = [];
      for(let i=0 ; i<followingIds.length ; i++){
        let followId = followingIds[i];
        // console.log(followId);
        let followingIdsOfFollowingArray = await getAllFollowingIdsPromisifed(followId);
        for(let j=0 ; j<followingIdsOfFollowingArray.length ; j++){
          if(  !followingIds.includes(followingIdsOfFollowingArray[j].followId) && followingIdsOfFollowingArray[j].followId != uid){
            suggestionIds.push(followingIdsOfFollowingArray[j].followId);
          }
        }
      }
      // console.log("suggestions" , suggestionIds);
      // console.log(suggestionIds);
      let suggestions = [];
      for(let i=0 ; i<suggestionIds.length ; i++){
        let suggestion = await getUserByIdPromisified(suggestionIds[i])
        suggestions.push(suggestion[0]);
      }
      // console.log(suggestions);
      res.json({
        message:"Succesfully got all suggestions !!",
        suggestions
      })
  }
  catch(error){
      res.json({
          message:"Failed to get suggestions !!"
      })
  }
}

module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest;
module.exports.getPendingRequests = getPendingRequests;
module.exports.cancelRequest = cancelRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getAllFollowing = getAllFollowing;
module.exports.unfollow = unfollow;
module.exports.getSuggestions = getSuggestions;
