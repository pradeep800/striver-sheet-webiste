import striverSheetData from "@/static/striverSheet.json";

export default async function Home() {
  let parsedStriverSheetData;

  try {
    parsedStriverSheetData = JSON.parse(striverSheetData as string);
  } catch (error) {
    console.error("Error parsing striverSheetData:", error);
    parsedStriverSheetData = {}; // or any other appropriate fallback value
  }
  const keys = Object.keys(parsedStriverSheetData);

  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quisquam at
      officia pariatur quos consectetur, sequi hic iste? Itaque sit, impedit
      rerum officia, veniam quo reiciendis ipsum amet et quas alias, dicta
      temporibus. Neque facere animi ullam corporis iusto odio. Atque sed
      dolorem totam quos, voluptates deserunt quo blanditiis? Fuga porro odio
      corporis sint quo voluptate iure, dolorum neque eveniet accusantium odit
      maiores doloremque, aliquid, vel ratione vitae sed dolore nisi delectus
      explicabo et repellat quas. Facere exercitationem eius impedit sapiente,
      ex consequatur in inventore, pariatur et optio mollitia officia,
      laboriosam numquam quibusdam provident laborum tenetur distinctio! Aliquid
      labore, deleniti quibusdam veniam sapiente modi aut repellendus aspernatur
      dolor, commodi vitae quis, voluptate unde. Asperiores laborum soluta
      itaque molestiae nemo sit quam necessitatibus consequuntur est dolorem
      nesciunt at, illum eos modi perspiciatis in totam, molestias provident?
      Qui voluptate distinctio laboriosam sapiente reiciendis? Rem, possimus
      doloremque ipsa fugit dolore corrupti quos recusandae fuga veritatis
      voluptatum quia ex. Inventore soluta velit quas nostrum doloremque officia
      aspernatur. Consequuntur vero quas impedit eos delectus, velit aspernatur
      voluptate eligendi ducimus hic labore modi. Quidem fuga magni deleniti
      exercitationem, accusamus inventore ipsa delectus amet quaerat eos enim
      voluptate aliquid mollitia odio explicabo. Omnis quo eaque perferendis
      quae possimus nihil quas cumque quam architecto veniam. Voluptatum
      repellat autem ducimus et nihil ab dolores laborum voluptatem repellendus
      eligendi nam iure voluptatibus assumenda, unde, quaerat reprehenderit
      illum vitae dicta facilis omnis sed voluptate nesciunt. Cumque quibusdam
      consequatur officiis porro voluptate cupiditate enim facere modi, aliquam
      laborum. Adipisci dolorem libero ad harum beatae quaerat voluptate
      doloremque porro totam reiciendis maiores aut error corporis magnam
      voluptas velit quia consequuntur sapiente, rem consectetur obcaecati
      distinctio quibusdam magni tempora. Aut itaque inventore possimus ut
      perferendis, quidem ducimus sint porro, quis temporibus ullam! Cumque
      eligendi esse illo! Minus dolore totam cum quod temporibus, cumque in id!
      Repellendus error deleniti at mollitia fuga suscipit ut nesciunt unde
      explicabo nisi, ipsum aperiam atque sequi consectetur maiores aut
      quibusdam minus, eos voluptates sit dignissimos necessitatibus repellat,
      quia obcaecati. Laborum architecto hic sunt voluptatem blanditiis nobis
      sapiente aliquid maiores nihil facere quo dolor id iste ab porro ipsum,
      corrupti numquam? Blanditiis maxime unde aliquid, quisquam expedita
      deserunt aperiam nisi facere officia sapiente fugiat esse assumenda ab!
      Repellendus accusamus enim architecto soluta accusantium maxime.
      Voluptates harum quasi eligendi, quos quaerat hic, distinctio totam ipsa
      magnam eius cumque assumenda fugit aliquam animi? Temporibus autem earum
      aliquid eveniet obcaecati, nemo libero laboriosam eligendi. Fugiat soluta
      velit cum quasi suscipit, corrupti facere. Quaerat tempore aut provident
      quia quod saepe quam dicta? Modi, non molestiae? Recusandae quis facere
      officiis tenetur molestiae repellendus eos sint, magni rerum dignissimos
      asperiores quibusdam corporis. Voluptatem accusantium quos quae rem
      nesciunt dicta minima ad, veritatis harum laudantium quas deserunt aut,
      architecto quidem ipsa aspernatur voluptatum a? Explicabo, reiciendis?
      Nobis minima saepe odio at ullam harum autem distinctio? Libero eaque
      aperiam quas vitae ad blanditiis distinctio natus sint ipsa, praesentium
      adipisci, magnam dignissimos dolor aspernatur ipsum laudantium inventore
      illo iure possimus, perspiciatis nesciunt odio tempore sunt. Veniam maxime
      quia ex voluptate mollitia praesentium fugit saepe reprehenderit
      recusandae quas dignissimos, dicta vero repellendus totam autem voluptas
      nihil harum non ut fuga? Quibusdam odio facere, officia tenetur doloremque
      non voluptatem provident, eius quam expedita quisquam odit qui neque
      recusandae molestias modi praesentium harum dolor iste incidunt! Quod
      minima dolores quisquam architecto soluta deleniti accusantium consectetur
      tenetur illum sit, rem voluptatibus blanditiis at perspiciatis perferendis
      pariatur deserunt saepe recusandae aliquam amet, delectus praesentium?
      Aperiam nostrum totam esse doloremque, blanditiis similique officia
      exercitationem amet nisi animi, saepe a corporis. In dolor reprehenderit,
      cupiditate nobis ratione, laudantium similique natus aperiam doloremque
      corporis est ipsam voluptates libero commodi minus optio officia
      laboriosam vero! Repellendus facilis quisquam, nostrum, architecto odit
      officia tenetur iste similique inventore cupiditate a? Dolores atque nemo
      esse doloremque, voluptatem dolor aliquid nobis deleniti expedita voluptas
      cumque sint iste, adipisci nesciunt, asperiores tempore molestias quasi
      tenetur! Suscipit hic autem eligendi error pariatur, tenetur rem
      explicabo! Hic repellat nesciunt officia totam in minus debitis modi
      tempora architecto unde veritatis magnam sunt at dolor molestiae rem non,
      animi saepe accusantium? Ducimus maxime est, esse dignissimos porro
      assumenda, qui optio autem cupiditate officiis nostrum nemo nesciunt
      maiores, officia magni soluta adipisci deleniti? Veritatis nulla iure ad?
      Illum perspiciatis tempore earum veniam nobis qui quo, dicta, repellendus
      deserunt, quis repellat minus pariatur perferendis minima animi suscipit
      accusamus repudiandae! Accusantium, corrupti. Aliquid, aperiam aliquam
      labore expedita laudantium animi dignissimos natus ipsum, explicabo iste
      impedit minus, molestiae laborum error ipsam nostrum dolore numquam non
      debitis similique exercitationem. Repudiandae optio omnis pariatur
      dignissimos quam rerum nisi fuga, similique eveniet reprehenderit nihil
      eum vitae unde fugiat. Consectetur, at adipisci cumque ullam, maxime in
      voluptatibus deserunt pariatur quis mollitia tenetur deleniti excepturi
      harum totam sapiente dolorem soluta rerum tempora aspernatur voluptate
      similique! Distinctio omnis dolorum facilis tempore alias dicta temporibus
      velit, fuga, mollitia dolor odio, modi unde dignissimos adipisci eligendi
      expedita consectetur totam labore nesciunt consequatur ex accusamus.
      Dolorem quod perferendis nulla est illo ducimus molestiae obcaecati rem
      neque, expedita esse, officia consequuntur recusandae ab adipisci.
      Repellendus quis facere vel maxime saepe neque corrupti, officia esse quos
      voluptas. Atque quo sequi magni dolores fuga necessitatibus, mollitia
      illum praesentium deleniti dolore laudantium nostrum quas expedita rem est
      ipsam sapiente asperiores qui? Quaerat, qui omnis! Quod ratione possimus
      tempora, eius autem cumque blanditiis. Ipsum, eaque odio delectus autem
      dolores, consectetur eius fuga dolor cum cupiditate beatae? Architecto
      nesciunt excepturi enim inventore deserunt? Magni libero ipsum eligendi
      perferendis officia, nulla maxime quis et unde sint quasi ea sed ex
      deserunt voluptatibus reiciendis aspernatur impedit alias deleniti in
      reprehenderit error inventore vel! Eveniet nihil distinctio beatae labore
      architecto nemo ab voluptas incidunt, facilis non possimus similique iusto
      nisi esse perferendis corrupti quae! Enim, voluptate quod ipsa blanditiis,
      inventore, sint voluptatum asperiores veritatis maxime deleniti magnam
      tenetur ex labore delectus officia beatae est repellat commodi pariatur
      nemo ut nihil doloremque explicabo. Pariatur aliquam ad blanditiis
      quisquam dicta tempora rem, quod veritatis laborum. Asperiores molestias
      officia distinctio nihil modi aliquam alias, nam est, numquam incidunt
      rerum dolor, ea nostrum?
    </div>
  );
}
