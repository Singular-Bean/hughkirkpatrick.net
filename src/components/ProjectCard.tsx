import {CategoryIcon} from "./CategoryIcon.jsx";

interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
}

export const ProjectCard = ({title, description, category}: ProjectCardProps) => {
    return (
        <div className="project-content">
            <h3 className="project-title">
                {title}
            </h3>
            <p className="project-description">
                {description}
            </p>
            <div className="project-footer">
                <CategoryIcon category={category}/>
                {category}
                <span className="project-arrow">→</span>
            </div>
        </div>
    );
};
