import { Cash } from "@/components";
import { get_userdata } from "@/utils";
import { getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import styles from "./index.module.scss";
import { diarys, char, shop, mission, badge, oto } from "@/assets";
import { useNavigate } from "react-router-dom";

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
  const [data, setData] = useState<DataType>();

  const iconButton = [
    {
      router: "diarys",
      text: "일기보기",
    },
    {
      router: "char",
      text: "캐릭터",
    },
    {
      router: "shop",
      text: "상점",
    },
    {
      router: "mission",
      text: "미션",
    },
    {
      router: "badge",
      text: "뱃지",
    },
    {
      router: "oto",
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
      <div className={`${styles.headers} mb-lg`}>
        <Cash value={1} />
        <Settings className={styles.settingsIcon} />
      </div>
      <div className={styles.iconButton}>
        {iconButton.map((item, i) => {
          return (
            <div key={i} onClick={() => navigate(`/${item.router}`)}>
              <img src={iconMap[item.router]} alt={item.router} />
              <p className="typo-body">{item.text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
