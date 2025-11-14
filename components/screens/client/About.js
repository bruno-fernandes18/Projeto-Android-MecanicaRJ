import { View, ScrollView, Text, Image } from 'react-native';
import { ClientDefaultStyle } from '../../styles/client/Default';
import { AppHeader, Footer } from '../../ui/client/Default';
import { AboutClientStyles } from '../../styles/client/About';
import { useAboutViewModel } from '../../../models/AboutViewModel';
export default function AboutScreen() {
  const { authStatus, actions } = useAboutViewModel();
  return (
    <View style={ClientDefaultStyle.container}>
      <AppHeader
        styleSet={ClientDefaultStyle}
        authStatus={authStatus}
        onLeftButtonPress={actions.handleHeaderButtonPress}
        onBackButtonPress={actions.handleBackButtonPress}
      />
      <ScrollView
        contentContainerStyle={ClientDefaultStyle.scrollContentContainer}>
        <View style={ClientDefaultStyle.content}>
          <Text style={AboutClientStyles.title}>Nossa História</Text>
          <Text style={AboutClientStyles.heading}>Quem Somos</Text>
          <Text style={AboutClientStyles.paragraph}>
            A Mecânica RJ nasceu da união improvável entre três homens de mundos
            completamente distintos. Leonel Passos, o idealista acadêmico,
            estudava Engenharia Mecânica na UFRJ e sonhava em construir algo que
            mudasse a vida das pessoas comuns. Frederic Cetin, francês de
            sotaque carregado e temperamento prático, havia passado 12 anos nas
            linhas de montagem da Peugeot em Sochaux antes de vir ao Brasil,
            fugindo de uma Europa que já não o inspirava. Guilherme Graça, o
            mais jovem, nascido e criado nas ruas do Centro do Rio, era
            ex-engraxate que descobriu desde cedo que motores contam histórias —
            bastava escutá-los com atenção. Diziam que ele tinha "ouvido de
            maestro", capaz de distinguir um problema de válvula apenas pelo
            ronco do escapamento.
          </Text>
          <Image
            source={require('../../../assets/fundadores_mecanica_rj.png')}
            style={AboutClientStyles.image}
          />
          <Text style={AboutClientStyles.caption}>
            Da esquerda para a direita: Leonel Passos, Guilherme Graça e
            Frederic Cetin.
          </Text>
          <Text style={AboutClientStyles.heading}>História</Text>
          <Text style={AboutClientStyles.paragraph}>
            Numa noite abafada de 1970, no Bar do Bidu em Santo Cristo, o trio
            se conheceu. Leonel tentava consertar o carburador de seu Opala 69
            estacionado na calçada, Frederic observava de longe com certo
            desprezo técnico, e Guilherme apareceu oferecendo um pano e um
            palpite certeiro. Entre cervejas e graxa, decidiram fundar uma
            cooperativa — não uma oficina comum, mas uma casa de confiança onde
            o cliente seria tratado como parceiro, não como ignorante. Em 1971,
            com um letreiro pintado à mão e uma caixa de ferramentas
            compartilhada, nascia a Mecânica RJ na Rua Barão da Gamboa, número
            47.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Os primeiros meses foram duros. Leonel ainda terminava a faculdade e
            dormia num colchão atrás do compressor. Frederic vivia mandando
            cartas à esposa Marie, que ficara em Marselha cuidando dos filhos.
            Guilherme, o mais comunicativo, ia às feiras oferecendo consertos a
            motoristas de caminhão. A garagem vivia meio vazia, meio sonhadora.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Tudo mudou quando Dona Olívia Menezes, professora aposentada do
            Colégio Pedro II, chegou chorando com seu Fusca azul-céu parado no
            meio da rua. Frederic quis cobrar caro, mas Guilherme o impediu.
            Consertaram o carro e recusaram o pagamento completo, aceitando
            apenas um bolo de fubá. Uma semana depois, Dona Olívia voltou com
            cinco amigos professores. Ali começou o primeiro "boca a boca" da
            oficina.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Em 1973, a tragédia abateu o grupo. Guilherme adoeceu gravemente
            durante um inverno excepcionalmente frio. Recusou-se a ir ao
            hospital por não querer "dar trabalho" e insistia em comparecer à
            oficina envolto num cobertor. Leonel e Frederic o encontraram
            desmaiado numa manhã de julho, com a mão ainda segurando uma chave
            inglesa. Morreu dias depois, deixando um bilhete curto e manchado de
            óleo: "Não deixem a oficina virar só um negócio." Esse papel
            permanece emoldurado perto da bancada principal até hoje.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Em 1974, o destino testou a oficina novamente. O jornalista Rubens
            Braga Neto, colunista automotivo de "O Globo", teve o motor de seu
            Opala Diplomata fundido exatamente em frente à Mecânica RJ durante
            uma tempestade. Molhado, irritado e atrasado para uma entrevista,
            foi recebido por Frederic com um "Deixe-me ouvir seu carro primeiro,
            monsieur". O conserto levou três horas. Rubens saiu com o carro em
            perfeito estado e uma história boa demais para não contar. Dois dias
            depois, publicou a crônica "A Oficina que Ouve os Carros", e a
            oficina amanheceu com fila dobrando a esquina. Foi o verdadeiro
            nascimento público da Mecânica RJ.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Nos anos seguintes, a cooperativa firmou seu primeiro contrato
            importante: a manutenção da frota da Cooperativa de Táxis São
            Cristóvão, intermediada por Gentil Cardoso, velho conhecido de
            Guilherme. O movimento cresceu, vieram novos aprendizes e a
            necessidade de organização. Leonel assumiu a parte administrativa,
            Frederic o treinamento técnico, e João Toledo de Martins — então um
            garoto de 14 anos que varria o chão — começou a aprender o ofício
            que mais tarde o transformaria no chefe do setor de estética
            automotiva.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Durante a crise do petróleo em 1979, quando quase ninguém podia
            pagar gasolina, a Mecânica RJ sobreviveu graças à fidelidade dos
            clientes e à inventividade de Leonel, que começou a adaptar motores
            para funcionar com etanol. Foi a primeira oficina da região
            portuária a oferecer esse tipo de conversão, garantindo prêmios
            locais e o respeito da concorrência. No mesmo ano, Frederic retornou
            brevemente à França para visitar Marie, já doente, e voltou com um
            presente simbólico: a velha placa "Atelier Ouvert", que hoje fica
            sobre a porta principal.
          </Text>
          <Image
            source={require('../../../assets/localizacao_mecanica_rj.png')}
            style={AboutClientStyles.image}
          />
          <Text style={AboutClientStyles.caption}>
            Nossa garagem na Rua Barão da Gamboa, em 1994.
          </Text>
          <Text style={AboutClientStyles.heading}>Lavagem de Carros</Text>
          <Text style={AboutClientStyles.paragraph}>
            Guilherme costumava dizer com um sorriso: "Um carro não está
            consertado se não estiver limpo. O brilho é o ponto final da
            história." Era uma filosofia que escondia algo profundo — respeito
            pelo cliente e pela máquina. João Toledo, o menino que herdou a
            flanela de Guilherme, levou essa lição ao extremo.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            Hoje, aos 62 anos, ele comanda o setor de estética automotiva com
            disciplina quase cerimonial. Cada lavagem é um ritual: o carro
            chega, é inspecionado sob luz fria, lavado com água medida em litros
            e shampoo neutro; o polimento final é feito com movimentos lentos e
            circulares até que o reflexo da rua apareça como pintura viva na
            lataria. João ensina seus aprendizes que "cada carro tem uma memória
            de toque" e merece respeito. As paredes do setor exibem fotos
            antigas — o Fusca azul de Dona Olívia, o Opala do jornalista Rubens
            Braga Neto, o primeiro táxi da frota São Cristóvão. São lembranças
            que mantêm viva a herança de Guilherme Graça. "O brilho", diz João,
            "é o que mantém o espírito dele conosco."
          </Text>
          <Image
            source={require('../../../assets/lavagem_mecanica_rj.png')}
            style={AboutClientStyles.image}
          />
          <Text style={AboutClientStyles.caption}>
            Nosso experiente trabalhador, João Toledo.
          </Text>
          <Text style={AboutClientStyles.heading}>Conserto</Text>
          <Text style={AboutClientStyles.paragraph}>
            Com o passar das décadas, o setor de conserto evoluiu sem abandonar
            suas raízes. Sob a direção técnica de Frederic e a supervisão
            detalhista de Leonel, a Mecânica RJ tornou-se referência em reparos
            que equilibram tradição e tecnologia. Hoje, nossos boxes recebem
            desde Opalas de colecionador até híbridos e elétricos modernos. As
            ferramentas antigas ainda têm lugar: o torno francês de Frederic,
            datado de 1964, é usado para peças personalizadas; o quadro de
            especificações de Leonel, escrito à mão e emoldurado, serve de guia
            até para os novos técnicos.
          </Text>
          <Text style={AboutClientStyles.paragraph}>
            O código de conduta continua o mesmo desde 1971: diagnóstico
            honesto, explicação clara e preço justo. Cada orçamento é
            acompanhado de uma conversa — sem jargões, sem truques, apenas
            transparência. Muitos dos antigos aprendizes hoje são donos de suas
            próprias oficinas, mas ainda voltam às sextas-feiras para o café das
            cinco, quando a equipe se reúne para ouvir histórias antigas e
            lembrar o porquê de tudo ter começado: três homens, uma garagem, e a
            crença de que consertar um carro é, no fundo, consertar um pedaço da
            confiança humana.
          </Text>
          <Image
            source={require('../../../assets/conserto_mecanica_rj.png')}
            style={AboutClientStyles.image}
          />
          <Text style={AboutClientStyles.caption}>
            Um cliente que aceitou participar de entrevista, satisfeito com
            nosso trabalho.
          </Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
