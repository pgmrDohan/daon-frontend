import { Cash, Character, DateSelect } from "@/components";
import { get_userdata } from "@/utils";
import { getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { Settings, Plus } from "lucide-react";
import styles from "./index.module.scss";
import { diarys, char, shop, mission, badge, oto, character } from "@/assets";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DataType {
  // cash: number,
  // disable: boolean,
  // email: string,
  id: string;
  // nickname: string,
  // provider: string,
  // username: string,
  // today: boolean
}

export function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<DataType>();

  const iconButton = [
    {
      icon: "diarys",
      text: "일기보기",
    },
    {
      icon: "char",
      text: "캐릭터",
    },
    {
      icon: "shop",
      text: "상점",
    },
    {
      icon: "mission",
      text: "미션",
    },
    {
      icon: "badge",
      text: "뱃지",
    },
    {
      icon: "oto",
      url: "https://www.1388.go.kr/cco/YTOSP_SC_CCH_01",
      text: "상담",
    },
  ];

  const iconMap: { [key: string]: string } = {
    diarys,
    char,
    shop,
    mission,
    badge,
    oto,
  };

  const handleClick = (link: string) => {
    window.open(link, "_blank")?.focus();
  };

  useEffect(() => {
    // const access_token = getCookie("access_token");
    // get_userdata(access_token)
    // 		.then((result) => {
    // 				setData(result);
    // 		})
    // 		//@ts-ignore
    // 		.catch((error) => {
    // 				location.replace("/login")
    // 		})
    setData({ id: "dsf" });
  }, []);

  return data === undefined ? null : (
    <>
      <div className={`${styles.headers}`}>
        <Cash value={1} />
        <Settings className={styles.settingsIcon} />
      </div>
      <div className={`${styles.iconButton}`}>
        {iconButton.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() =>
                item.url ? handleClick(item.url) : navigate(`/${item.icon}`)
              }
            >
              <img src={iconMap[item.icon]} alt={item.icon} />
              <p className="typo-body">{item.text}</p>
            </div>
          );
        })}
        <div
          key={iconButton.length}
          onClick={() => {
            setSearchParams({ ["popup"]: "1" });
          }}
        >
          <div className={styles.circle}>
            <Plus />
          </div>
          <p className="typo-body">친구초대</p>
        </div>
      </div>
      <Character img={character} name="엄지척도하니" level={11} />
      <DateSelect className={`mt-md`} />
    </>
  );
}
