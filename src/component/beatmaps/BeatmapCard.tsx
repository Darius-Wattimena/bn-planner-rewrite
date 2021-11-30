import React from "react";
import {Beatmap, User} from "../../models/Types";
import { AiOutlinePaperClip } from 'react-icons/ai';
import { GoCommentDiscussion } from 'react-icons/go';
import { FiInfo } from 'react-icons/fi';
import { NavLink } from "react-router-dom";
import {getBeatmapStatus} from "../../utils/BeatmapUtils";
import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";

interface BeatmapCardProps {
  beatmap: Beatmap | undefined
  users: User[]
}

function BeatmapCard({ beatmap, users }: BeatmapCardProps) {
  if (!beatmap) return <></>

  let mapperDetails = users.find(user => user.osuId === beatmap.mapperId)
  let mapperRoleClass = getUserRole(mapperDetails)?.className
  const beatmapStatus = getBeatmapStatus(beatmap.status)

  return (
    <div className={`beatmap-card ${beatmapStatus?.className}`}>
      <div className={`beatmap-status-stripe ${beatmapStatus?.className}`} />
      <div className={"beatmap-banner-container"}>
        <div className={"beatmap-banner"} style={{ backgroundImage: `url(https://assets.ppy.sh/beatmaps/${beatmap.osuId}/covers/card.jpg)`}}>
          <div className={"beatmap-mapper-container"}>
            <div className={"beatmap-mapper"}>
              <div className={"beatmap-mapper-spacer"} />
              <div className={"beatmap-mapper-picture-container"}>
                <div className={"beatmap-mapper-picture"} style={{ backgroundImage: `url(https://a.ppy.sh/${beatmap.mapperId})`}} />
              </div>
              <div className={`beatmap-user-username ${mapperRoleClass}`}>
                {beatmap.mapper}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={"beatmap-details"}>
        <div className={"beatmap-details-title"}>
          {truncate(beatmap.title, 25)}
        </div>
        <div className={"beatmap-details-artist"}>
          {truncate(beatmap.artist, 25)}
        </div>
        <div className={"beatmap-nominators"}>
          <BeatmapCardNominator nominatorId={beatmap.nominators[0]} nominated={beatmap.nominatedByBNOne} users={users} />
          <BeatmapCardNominator nominatorId={beatmap.nominators[1]} nominated={beatmap.nominatedByBNTwo} users={users} />
        </div>
      </div>

      <div className={"beatmap-card-footer"}>
        <a href={`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}`}><AiOutlinePaperClip /></a>
        <a href={`https://osu.ppy.sh/beatmapsets/${beatmap.osuId}/discussion`}><GoCommentDiscussion /></a>
        <NavLink to={`/beatmaps/${beatmap.osuId}`}><FiInfo /></NavLink>
      </div>
    </div>
  )
}

function truncate(str: string, n: number){
  return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
}

interface BeatmapCardNominatorProps {
  nominatorId: number
  nominated: boolean
  users: User[]
}

function BeatmapCardNominator({ nominatorId, nominated, users }: BeatmapCardNominatorProps) {

  if (nominatorId === 0) {
    return (
      <div className="beatmap-nominator" />
    )
  } else {
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
            style={{ backgroundImage: `url(${nominatorProfilePictureUri})`}} />
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
}

export default BeatmapCard