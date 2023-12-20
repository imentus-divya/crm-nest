import { Column, Entity,PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { Screens } from "./screens.entity";




@Entity('screen_url')
export class Screen_url{
    @PrimaryGeneratedColumn()
    id:number

    // @ManyToOne(() => Screen,sc=>sc.id)
    // @JoinColumn({ name: 'screen_id' })
    // screen_id: Screen;

    @ManyToOne(() => Screens,sc=>sc.id)
    @JoinColumn({ name: 'screen_id' })
    screen_id: Screens;

    // @ManyToOne(() => Screens, screen => screen.screenUrls)
    // @JoinColumn({ name: 'screen_id' })
    // screen: Screens;

  

    @Column({nullable:false})
    url:string

    @Column({nullable:false})
    url_type:string

    @Column({nullable:false})
    url_description:string
}