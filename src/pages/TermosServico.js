import React, { Component } from "react";

import HeaderDefault from "../components/HeaderDefault.js";
import FooterDesloged from "../components/FooterDesloged.js";

import '../assets/css/responsive-deslog.css';

export default class TermosSevico extends Component {
    render() {
        return (
            <div className="termos">
                <header className="default">
                    <div className="container lg">
                        <HeaderDefault  />
                    </div>
                </header>

                <main>
                    <div className="container content webdoor-content">
                        <h2 className="title">Termos de serviço</h2>
                    </div>

                    <div className="container terms-content">
                        <p className="terms-text">MATHES SITE E SERVIÇOS LTDA., inscrita no CNPJ sob o nº 27.502.091/0001-10, com sede na Praia do Flamengo nº 254 apto. 804, Flamengo, Rio de Janeiro – RJ, CEP: 22.210-065, doravante denominado simplesmente CONTRATADO, e a pessoa física identificada na página de cadastramento da NETGIFT, que para todos os efeitos, faz parte integrante deste contrato, doravante denominado simplesmente "CONTRATANTE", celebram o presente Contrato de Assinatura, Licença de Uso de Software (“contrato” ou “Termos e Condições”), que se regerá pelas cláusulas e condições abaixo:</p>

                        <h3 className="terms-title">1. OBJETO DO CONTRATO</h3>

                        <p className="terms-text">1.1 O presente instrumento tem como objeto o uso da licença de uso do software NETGIFT, bem como a prestação de serviços de software para a contratante disponibilizados no site da NETGIFT (www.netgift.com.br).</p>

                        <h3 className="terms-title">2. LICENÇA DE USO</h3>

                        <p className="terms-text">2.1 A presente licença de uso do software NETGIFT terá os aspectos da irretratabilidade e da irrevogabilidade.</p>

                        <h3 className="terms-title">3. PRESTAÇÃO DE SERVIÇOS</h3>

                        <p className="terms-text">3.1 A prestação de serviços de software compreenderá a disponibilização de um espaço virtual para que o CONTRATANTE crie sua página (site) pessoal, mediante layouts oferecidos, recursos existentes (como lista de presentes virtuais), nas condições, nos prazos e nos custos estabelecidos pela NETGIFT.</p>

                        <h3 className="terms-title">4. OBRIGAÇÕES DA CONTRATANTE</h3>

                        <p className="terms-text">4.1 A CONTRATANTE se responsabiliza por inserir conteúdo em sua página pessoal, bem como integralmente pelo teor deste, incluindo mas não se esgotando na responsabilidade pelas imagens e informações inseridas, inclusive no que concerne ao direito autoral, ao direito de imagem, à vida privada sua ou de terceiro.</p>

                        <p className="terms-text sub-item">4.1.1 A CONTRATANTE se compromete a não publicar conteúdo que possa ser ofensivo e/ou publicitário e que não respeite este instrumento ou a legislação aplicável.</p>

                        <p className="terms-text">4.2 A CONTRATANTE se responsabiliza pelos problemas decorrentes do uso incorreto do software e do site NETGIFT.</p>

                        <p className="terms-text">4.3 A CONTRATANTE é a responsável pelo preenchimento e pela veracidade dos dados e informações cadastrais por ela informadas e inseridas no site NETGIFT, como, dentre outros, o nome, CPF, datas, correio eletrônico, dados bancários.</p>

                        <p className="terms-text sub-item">4.3.1 O CONTRATADO não se responsabiliza por eventuais problemas ou atrasos decorrentes do uso incorreto do software e site NETGIFT, bem como pelo preenchimento incorreto de informações inseridas pelo CONTRATANTE no site NETGIFT.</p>

                        <p className="terms-text sub-item">4.3.2 A CONTRATANTE garante a veracidade e exatidão dos dados e informações cadastradas e fornecidos ao CONTRATADO, sendo responsável por informações falsas ou inexatas que realize e dos possíveis danos que possa causar à NETGIFT ou a terceiros.</p>

                        <p className="terms-text">4.4 A CONTRATANTE aceita resolver qualquer tipo de conflito sobre o conteúdo publicado e inserido por ela no site (página) pessoal sem a intermediação ou participação do CONTRATADO, sob pena de arcar com eventual custas do CONTRATADO decorrente do fato.</p>

                        <h3 className="terms-title">5. FRAUDES E AUDITORIA DE COMPRAS</h3>

                        <p className="terms-text">5.1. O CONTRATADO se reserva o direito de iniciar e processar cancelamentos, sem a necessidade de intervenção ou aprovação da CONTRATANTE, caso detecte indícios de fraude em compras, estejam elas pendentes de aprovação ou já aprovadas, sejam os indícios da parte do CONTRATANTE ou convidado; em caso de estorno do valor pela companhia de cartão de crédito ou bancária por valores já transferidos ao CONTRATANTE, este é responsável pela devolução deste valor.</p>

                        <p className="terms-text">5.2. Caso verifiquemos um número elevado de reclamações referentes a um mesmo site criado pelo CONTRATANTE com processos de chargerback por parte da instituição financeira, as transferências poderão ser bloqueadas por prazo a ser estipulado pelas instituições financeiras. Após este período, se os valores não forem contestados, as operações seguirão o seu curso regular.</p>

                        <h3 className="terms-title">6. COTA PRESENTE – Lista de Presente Virtual (créditos)</h3>

                        <p className="terms-text">6.1 Os presentes virtuais (créditos) ficarão disponíveis para aquisição até 48 (quarenta e oito) horas após a data da festa preenchido pela CONTRATANTE no cadastro do site NETGIFT. Decorrido este prazo a lista de presentes poderá ser encerrada pela NETGIFT.</p>

                        <p className="terms-text">6.2 O valor referente ao presente Virtual (créditos) adquirido será transferido em até 30 (trinta) dias da data da compra para a conta bancária informada pela CONTRATANTE, descontados eventuais impostos e taxa de serviço cobrado pelo CONTRATADO conforme previsto neste TERMOS E CONDIÇÕES.</p>

                        <p className="terms-text sub-item">6.2.1 Caso os trinta dias acima previstos se encerrem em feriados, finais de semana ou outras datas sem expediente bancário a transferência poderá ser prorrogada até o primeiro dia útil seguinte.</p>

                        <p className="terms-text sub-item">6.2.2 Caso haja a identificação de uma possível fraude, as regras de FRAUDES E AUDITORIA DE COMPRAS citadas nesse documento entrarão em vigor, bem como o CONTRATANTE poderá suspender a transferência até a sua devida resolução.</p>

                        <p className="terms-text">6.3 O CONTRATADO cobra uma taxa de serviço de 8% (oito por cento) sobre o valor total dos presentes VIRTUAIS (créditos) recebidos pelo contratante.</p>

                        <h3 className="terms-title">7. DA RESCISÃO</h3>

                        <p className="terms-text">7.1 O contrato poderá ser rescindido caso uma das partes descumpra o estabelecido nas cláusulas do presente instrumento, sendo sempre devida a cobrança em favor do CONTRATADO da taxa de serviço nos termos da cláusula sexta deste contrato.</p>

                        <h3 className="terms-title">8. DO ENCERRAMENTO E SUSPENSÃO DO SITE</h3>

                        <p className="terms-text">8.1 Caso haja mau uso do site ou software, violação de direito de terceiros, descumprimento da legislação aplicável ou destes Termos e Condições pela CONTRATANTE, bem como em virtude de notificações judiciais ou extrajudiciais, poderá o CONTRATADO notificar, suspender ou encerrar o site pessoal, lista de presentes virtuais criadas, e outros serviços disponibilizados sem qualquer aviso prévio. </p>

                        <p className="terms-text sub-item">8.1.1 No caso de encerramento do site pessoal ou da lista de presentes virtuais criadas o presente contrato será rescindido nos termos da cláusula oitava acima.</p>

                        <p className="terms-text">8.2 O CONTRATADO poderá encerrar o site pessoal da CONTRATANTE passados quarenta e oito horas da data informada do evento. Após este período, poderá ser completamente removido de nosso sistema sem a possibilidade de recuperação do conteúdo.</p>

                        <h3 className="terms-title">9. DA PUBLICIDADE E PROTEÇÃO DE DADOS</h3>

                        <p className="terms-text">9.1 A CONTRATANTE autoriza a utilização de seu site pessoal criado e nome pelo CONTRATADO, podendo este apresentá-los como seu cliente em peças de propaganda e publicidade.</p>

                        <p className="terms-text">9.2 Os dados pessoais fornecidos pela CONTRATANTE em cadastro do site NETGIFT serão utilizados para a execução dos serviços oferecidos pelo CONTRATADO, bem como poderão ser utilizados para contato de promoções e ofertas de serviço do CONTRATADO.</p>

                        <p className="terms-text sub-item">9.2.1 A CONTRATANTE poderá editar, retificar ou acessar seus dados cadastrados diretamente por meio de sua conta pessoal no site da NETGIFT.</p>

                        <p className="terms-text sub-item">9.2.2 O CONTRATADO se reserva no direito de excluir os dados cadastrados, conta pessoal e sites criados após a data do evento e decorrente transferência dos créditos líquidos relativos aos presentes virtuais recebidos.</p>

                        <p className="terms-text">9.3 O CONTRATADO adotou medidas e implementou procedimentos de segurança, tanto do ponto de vista técnico como organizacional, para garantir a segurança de seus dados pessoais e evitar a perda, alteração ou processamento não autorizados.</p>

                        <h3 className="terms-title">10. CONDIÇÕES GERAIS</h3>

                        <p className="terms-text">10.1 O CONTRATADO se reserva a possibilidade de alterar, sem aviso prévio, o desenho, a apresentação e/ou configuração do site NETGIFT, bem como alguns de seus serviços ou funcionalidades, podendo eliminar e acrescentar os que entender necessários.</p>

                        <p className="terms-text">10.2 Em qualquer caso, o CONTRATADO se reserva o direito, a qualquer momento e sem necessidade de aviso prévio, de negar acesso ao software e ao site NETGIFT aos usuários que utilizarem de forma inadequada ou não cumprirem estes Termos e Condições ou a legislação aplicável. </p>

                        <p className="terms-text">10.3 O CONTRATADO se reserva o direito a interromper o Serviço devido a trabalhos de manutenção ou melhora dos mesmos, estando isento de qualquer responsabilidade que possa advir da interrupção.</p>

                        <p className="terms-text">10.4 O CONTRATADO está isento de qualquer responsabilidade por quaisquer danos que advenham da falta de disponibilidade ou continuidade de funcionamento do serviço objeto deste contrato.</p>

                        <p className="terms-text sub-item">10.4.1 Alguns eventos ou fatores como modelo do aparelho celular, versão do sistema operacional ou do aplicativo utilizado, navegador desatualizado, resolução de tela fora dos padrões, antivírus configurado incorretamente, redes corporativas com limitações de acesso, conexões 2G ou sinais fracos de Wifi, 3G e/ou4G, bem como outras, poderão afetar o funcionamento regular do site e suas funcionalidades, comprometendo de fato seu desempenho e de suas ferramentas.</p>


                        <p className="terms-text">10.5. Caso uma das cláusulas previstas neste contrato seja declarada total ou parcialmente ineficaz ou inválida, tal nulidade ou ineficácia afetará apenas essa disposição ou a parte dela que resulte inválida ou ineficaz, subsistindo todo o resto que for válido, e considerando-se essa mesma disposição como inexistente.</p>
                        
                        <p className="terms-text">10.6 Todas as notificações, requerimentos, solicitações e outras comunicações a serem apresentadas pelas partes devem ser feitas por escrito e entendem-se devidamente apresentadas quando forem entregues em mãos ou enviadas por correio para o endereço ou e-mail da outra parte, ou para qualquer outro endereço ou e-mail que para estes fins cada parte possa indicar.</p>
                        
                        <h3 className="terms-title">11. EFEITOS DO CADASTRO NOS TERMOS E CONDIÇÕES DE USO</h3>

                        <p className="terms-text">11.1. O cadastramento e o uso do site NETGIFT comportam em aceitação plena e submissão sem reservas do conteúdo do presente TERMOS E CONDIÇÕES, que poderão ser acessadas por meio de link no próprio site.</p>
                        
                        <h3 className="terms-title">12. DO FORO</h3>

                        <p className="terms-text">Para dirimir quaisquer controvérsias oriundas do presente contrato, as partes elegem o foro da capital do Estado do Rio de Janeiro - RJ.</p>
                    </div>

                    <div className="container md waves-mob"></div>

                    <FooterDesloged />
                </main>
            </div>
        )
    }
}