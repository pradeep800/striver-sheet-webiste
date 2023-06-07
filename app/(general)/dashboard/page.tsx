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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis iure
      debitis sed, aspernatur pariatur assumenda ad porro, esse minima,
      voluptate numquam aut. Tempora quidem tenetur reiciendis cumque est hic
      obcaecati mollitia error laboriosam sunt, voluptas neque adipisci itaque
      explicabo iste consequatur similique veritatis dolorum? Omnis minima
      ducimus veritatis autem id distinctio! Inventore officia atque tenetur
      consequatur eligendi iure aspernatur corrupti, facilis eos delectus, nihil
      non reprehenderit nostrum voluptatibus odio hic omnis. Nam excepturi
      beatae praesentium esse doloribus sint, hic, saepe, vitae ipsam rerum
      harum tempore itaque voluptatibus quas non nisi quibusdam. Illum enim
      quisquam suscipit molestias, asperiores quaerat! Laudantium necessitatibus
      expedita ab omnis corrupti aliquid, neque, aut placeat harum excepturi ad
      assumenda soluta debitis repellendus consequatur laboriosam amet
      recusandae eius dolore iusto blanditiis iure numquam itaque voluptates?
      Accusamus iste quod aliquam quasi itaque ullam pariatur non nemo illum
      placeat. Nostrum vel maxime aspernatur, provident iste ab placeat enim.
      Optio autem laudantium accusamus unde velit recusandae dolore laboriosam,
      facilis tenetur commodi saepe natus officiis incidunt consequatur, nihil,
      eum iste quam libero earum nobis aliquid. Et ipsum quod soluta ad optio
      suscipit expedita laboriosam quas atque dolore reprehenderit perferendis,
      ullam id blanditiis sapiente repellat facilis, cumque autem vero dolor,
      quae ducimus similique neque! Repudiandae ut eius ad officia esse
      aspernatur ab, ratione magnam doloremque facere delectus eveniet fuga
      cumque, quibusdam accusantium illum ipsum distinctio accusamus. Recusandae
      minima repellendus iusto, ad repudiandae soluta deserunt, dolores,
      voluptates pariatur voluptate debitis? Unde a ducimus atque. Cupiditate
      magni et in ut laboriosam! Nisi error alias iste recusandae deleniti
      mollitia ipsam quibusdam, facere ullam a odit ea qui est iusto eum sit
      itaque quas minima, adipisci, quidem quasi. Quaerat fuga saepe labore
      iusto repellendus accusamus officiis est quasi optio, amet necessitatibus
      in ad architecto, id vel molestias corporis. Doloremque magnam, delectus
      quidem ullam error esse illum, sint atque officia iusto cumque minima?
      Praesentium officia eaque distinctio illo quam exercitationem officiis
      amet, alias dolores? Amet, blanditiis similique voluptatibus quibusdam
      doloremque sit fuga facilis illo aliquam! Laboriosam vero error dolorum at
      harum, corporis sapiente cupiditate laudantium inventore libero quae
      dolorem explicabo nam, odit voluptatum sed! Sint ipsa quaerat, tenetur
      consequatur facilis quo nulla dolores adipisci dolorem quasi explicabo
      recusandae quae deleniti quod aspernatur labore necessitatibus nobis
      architecto sapiente. Perspiciatis repellendus recusandae magni aut impedit
      animi tempora fugiat corporis reprehenderit nulla quidem, eligendi
      repellat, natus itaque. Aut quaerat rem, explicabo quasi odio ipsum vitae
      aperiam facere nulla facilis voluptas animi voluptate fugiat optio
      laboriosam. Recusandae enim, corrupti cum nemo ab repellat eligendi,
      consectetur sit, dolorum quidem quasi alias. Reprehenderit dolore quam
      quasi delectus unde velit dolor esse deserunt numquam voluptate rem ipsam
      soluta, praesentium, doloremque eum doloribus dignissimos quo asperiores
      reiciendis recusandae dolorum. Excepturi minus iste aspernatur rem
      nesciunt distinctio dolorum iusto. Quas necessitatibus error libero
      voluptatibus soluta, perferendis excepturi veniam illo ullam non
      consequuntur sit quae? Libero, ab labore ipsam modi, iste quia laboriosam
      enim nobis ea delectus aliquid iure. Culpa quo quis maiores a quae, ipsa
      dolor earum doloribus minima, delectus ratione, iusto autem. Minus et
      similique tenetur numquam iste obcaecati necessitatibus laudantium. Error
      commodi sit officiis eveniet? Modi magni enim ullam soluta? Voluptate,
      ratione? Pariatur corrupti cupiditate quibusdam consequatur quod, fuga
      ratione provident, quis neque veniam quo. Quasi error facilis labore
      eveniet impedit. Ea ut officiis laborum pariatur animi fugiat incidunt
      mollitia voluptates iure dignissimos magnam, sit consequatur ipsa adipisci
      iste labore dolorum ab sequi eveniet! Hic culpa esse voluptatibus alias
      mollitia laudantium recusandae commodi enim, ipsa incidunt ut beatae dolor
      doloremque natus debitis! Mollitia, debitis! Odit sapiente quod
      reprehenderit odio, libero eveniet recusandae unde dolorum iure
      repellendus ullam, officia ducimus. Eaque recusandae iusto non adipisci
      libero itaque maiores reiciendis officia officiis necessitatibus aliquam
      voluptas ullam quia possimus expedita vitae beatae nisi cupiditate
      voluptatum consequuntur, veritatis nemo atque vero ipsam. Voluptates, non!
      Harum culpa quod, est corrupti, magni labore numquam mollitia repudiandae
      beatae nisi veritatis odit obcaecati dolorem incidunt neque nihil. Tenetur
      dolore, aliquam fuga corrupti omnis saepe dolores, doloremque, qui
      architecto repellendus incidunt dicta odit nemo voluptates eligendi optio
      provident cum quo explicabo magni enim impedit! Nihil iure illo voluptate
      repellat eveniet ducimus distinctio veniam provident ullam, suscipit
      nostrum consequatur expedita harum vero ratione, eligendi sunt optio
      reprehenderit laboriosam hic ipsum magni quia. Cum commodi optio
      voluptatem quos ipsa ea necessitatibus quidem asperiores fugit, itaque
      aperiam! Numquam laborum tempore explicabo quidem similique architecto rem
      enim, perferendis necessitatibus totam error vel ipsa laboriosam quis
      recusandae consequatur aperiam mollitia hic accusamus porro, minus eaque
      aliquid. Suscipit asperiores magni a dolore. Corporis iusto, esse
      laudantium quibusdam harum officia officiis excepturi minima. Laborum
      labore fugiat repellat, consequatur incidunt ab recusandae numquam earum.
      Eius labore totam vitae. Delectus, magnam aliquid nemo iste, facilis,
      velit dolores accusamus fuga sunt molestias odit odio id! Nostrum
      incidunt, blanditiis voluptatem officiis, ipsum, tenetur sunt sapiente
      doloremque libero quaerat minima ipsa unde! Commodi assumenda quis dolores
      eius at quaerat ipsum? Asperiores totam tempore dolores corrupti suscipit
      sequi incidunt. Amet voluptatibus accusantium eligendi voluptatum quisquam
      tempore nobis, suscipit eum. Delectus sit esse, nostrum nulla facere
      quibusdam? Voluptate laboriosam ipsum vel quisquam dignissimos, itaque
      libero iure ut vitae mollitia, nisi rerum autem sequi cum ullam saepe. Ex
      nihil incidunt vitae cumque provident numquam hic fugiat, mollitia, amet
      exercitationem totam facere harum architecto libero consectetur sunt
      dolorum suscipit! Delectus odio, commodi ea laborum ad incidunt iusto.
      Nemo eveniet adipisci a tempore optio veritatis dolor quo maiores ipsum
      dicta, itaque quisquam vero? Officia ipsum sequi qui reprehenderit
      aspernatur laborum delectus expedita ipsam, similique autem accusantium!
      Est harum illo eum! Doloribus eum molestias enim, corrupti beatae sint
      eos, quod optio deserunt ad quibusdam tenetur quam, commodi rerum earum.
      Maxime cupiditate sed, perspiciatis et sequi odit quasi illo atque minima
      voluptates dolore magni est eveniet fugiat totam hic neque possimus saepe
      itaque quae voluptatum nisi error iste qui. Cum dolores error sunt sint
      assumenda in eos perspiciatis id reiciendis soluta. Pariatur iusto beatae
      dolores modi impedit laboriosam vero alias molestiae corrupti, praesentium
      saepe tempore quod fugit est enim corporis veritatis eos id, vitae, illum
      ratione? Quia cumque placeat laborum culpa voluptatibus et?
    </div>
  );
}
