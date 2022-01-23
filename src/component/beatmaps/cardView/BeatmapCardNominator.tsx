import {getProfilePictureUri, getUserRole} from "../../../utils/UserUtils";
import React from "react";
import {User} from "../../../models/Types";

interface BeatmapCardNominatorProps {
  nominatorId: number
  nominated: boolean
  users: User[]
}

export function BeatmapCardNominator({nominatorId, nominated, users}: BeatmapCardNominatorProps) {
  let nominatorDetails = users.find(user => user.osuId === nominatorId)
  let nominatorName = nominatorDetails?.osuName
  let nominatorProfilePictureUri = getProfilePictureUri(nominatorId)

  let hasNominatedClass;
  let nominatorRoleClass = getUserRole(nominatorDetails)?.className

  if (nominated) {
    hasNominatedClass = "nominated"
  } else {
    hasNominatedClass = "not-nominated"
  }

  return (
    <div className={`beatmap-nominator ${hasNominatedClass}`}>
      <div className={`beatmap-nominator-picture-container`}>
        <div
          className={`beatmap-nominator-picture`}
          style={{backgroundImage: `url(${nominatorProfilePictureUri})`}}/>
      </div>
      <div className={"beatmap-nominator-text"}>
        <div className={`beatmap-user-username beatmap-nominator-name`}>
          <div className={"beatmap-nominator-name-text"}>
            {nominatorName}
          </div>
          {nominatorDetails != null &&
          <div className={`beatmap-nominator-role ${nominatorRoleClass}`}>
            {nominatorDetails.role}
          </div>
          }
        </div>
      </div>
    </div>
  )
}