import { Button, Modal, Paper, Space, Text, Title } from '@mantine/core'
import React from 'react'
import { IArticle } from '../types/type'
import { useDisclosure } from '@mantine/hooks'

type CustomCardProps = {
  article?: IArticle | undefined
}

const CustomCard = ({article}:CustomCardProps) => {
  const { titreArticle, datePubArticle, auteur, contenu } = article || {};
  const [opened, { open, close }] = useDisclosure(false);


  return (
 
   <div className=' flex flex-col bg-teal-100 rounded-md w-[650px] h-52 px-6 py-4 border drop-shadow-sm'>
    <Title order={3}>La science applique {titreArticle}</Title>
    <Space h="md"/>
    <Text lineClamp={4}>
      {contenu}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quae, quibusdam. Quisquam, quos.
      neio eofngeneknvkrnvrngrtpoprnjdv rekgn elkrvnegnlvkner gnlgvklrenvlkrnenglregnvrelvrelkvnre.gn
      ergklfvnregeglsdk,vnasnvoreeowifhlkdnvjb,jnewknsdf oinfwekfv eofnoef ndnfelaeknrnfnoeihw, vebvowenve,ewobfwknfwpo
    </Text>
    <Space h="md"/>
    <div className='flex justify-between '>
      <div className='ml-2'>
        <Text size='xs' >Ecrit par Antonio {auteur?.prenom} {auteur?.nom}</Text>
        <Text size='xs'>Le 26 octobre 2024 {datePubArticle ? datePubArticle.toLocaleString("fr") : ''}</Text>
      </div>
      <Button color='teal' onClick={open}>Critiques</Button>
    </div>

    {/* MODAL POUR AFFICHER LES CRIRTIQUES DE L'ARTICLE */}

    <Modal opened={opened} onClose={close} title="Critiques" >
      <div>
        <Text>Les critiques</Text>
      </div>
    </Modal>
   </div>
  
  )
}

export default CustomCard